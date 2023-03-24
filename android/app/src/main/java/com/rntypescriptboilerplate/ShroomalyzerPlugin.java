package com.rntypescriptboilerplate;

import java.io.*;
import java.lang.*;
import java.net.*;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.util.*;

import android.util.Log;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.Image;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import org.jetbrains.annotations.NotNull;

import com.facebook.react.bridge.*;
import com.facebook.react.uimanager.IllegalViewOperationException;

import org.tensorflow.lite.task.vision.classifier.Classifications;
import org.tensorflow.lite.DataType;
import org.tensorflow.lite.Interpreter;
import org.tensorflow.lite.support.image.ImageProcessor;
import org.tensorflow.lite.support.image.TensorImage;
import org.tensorflow.lite.support.image.ops.ResizeOp;
import org.tensorflow.lite.support.image.ops.ResizeWithCropOrPadOp;

import org.tensorflow.lite.support.common.FileUtil;
import org.tensorflow.lite.support.common.TensorProcessor;
import org.tensorflow.lite.support.common.ops.NormalizeOp;
import org.tensorflow.lite.support.label.TensorLabel;
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer;

public class ShroomalyzerPlugin extends ReactContextBaseJavaModule implements ImageClassifierHelper.ClassifierListener {
  private ReactApplicationContext context;
  private WritableMap resultData = new WritableNativeMap();
  private static final String MODEL = "mushroom.tflite"; // location of tflite model

  public ShroomalyzerPlugin(ReactApplicationContext reactContext) {
    super(reactContext); // required by React Native.
    context = reactContext;
  }

  // Identifyer so javascript can read native plugin.
  public String getName() {
    return "Shroomalyze";
  }

  private MappedByteBuffer loadModelFile() throws IOException {
    String MODEL_ASSETS_PATH = "mushroom.tflite";
    AssetFileDescriptor assetFileDescriptor = context.getAssets().openFd(MODEL_ASSETS_PATH);
    FileInputStream fileInputStream = new FileInputStream(assetFileDescriptor.getFileDescriptor());
    FileChannel fileChannel = fileInputStream.getChannel();
    long startoffset = assetFileDescriptor.getStartOffset();
    long declaredLength = assetFileDescriptor.getDeclaredLength();
    return fileChannel.map(FileChannel.MapMode.READ_ONLY, startoffset, declaredLength);
  }

  @ReactMethod
  public void RunModel(String filePath, Callback success, Callback error)
      throws Exception {
    Bitmap bm = loadImage(filePath);

    // Resize and pad image
    int sq_size = bm.getHeight();
    if (sq_size < bm.getWidth()) {
      sq_size = bm.getWidth();
    }
    ImageProcessor imageProcessor = new ImageProcessor.Builder()
        .add(new ResizeWithCropOrPadOp(sq_size, sq_size))
        .add(new ResizeOp(256, 256, ResizeOp.ResizeMethod.BILINEAR))
        .build();
    TensorImage tensorImage = new TensorImage(DataType.FLOAT32);
    tensorImage.load(bm);
    tensorImage = imageProcessor.process(tensorImage);

    // Create output buffer
    TensorBuffer probabilityBuffer = TensorBuffer.createFixedSize(new int[] { 1, 10 }, DataType.FLOAT32);

    Interpreter interpreter = new Interpreter(loadModelFile());
    interpreter.run(tensorImage.getBuffer(), probabilityBuffer.getBuffer());
    ByteBuffer tensorOutput = interpreter.getOutputTensor(0).asReadOnlyBuffer();
    interpreter.close();

    SoftMax softmax = new SoftMax(probabilityBuffer.getFloatArray());
    probabilityBuffer.loadArray(softmax.getValue());

    final String ASSOCIATED_AXIS_LABELS = "labels.txt";
    List<String> associatedAxisLabels = null;

    try {
      associatedAxisLabels = FileUtil.loadLabels(this.context, ASSOCIATED_AXIS_LABELS);
    } catch (IOException e) {
      Log.e("tfliteSupport", "Error reading label file", e);
    }

    TensorProcessor probabilityProcessor = new TensorProcessor.Builder().build();

    if (null != associatedAxisLabels) {
      // Map of labels and their corresponding probability
      TensorLabel labels = new TensorLabel(associatedAxisLabels,
          probabilityProcessor.process(probabilityBuffer));

      // Create a map to access the result based on label
      Map<String, Float> floatMap = labels.getMapWithFloatValue();

      // This sucks
      resultData.putString("floatMap", floatMap.toString());
    }

    success.invoke(resultData);
    resultData = new WritableNativeMap();
  }

  // @ReactMethod
  // public void RunModel(String filePath, Callback success, Callback error)
  // throws Exception {
  // try {
  // Bitmap bitmap = loadImage(filePath);

  // ImageClassifierHelper imageClassifier = ImageClassifierHelper.create(context,
  // this);
  // imageClassifier.classify(bitmap);
  // success.invoke(resultData);

  // // clean up map for next run of modeal.
  // resultData = new WritableNativeMap();
  // } catch (IllegalViewOperationException e) {
  // error.invoke(e.getMessage());
  // }
  // }

  private Bitmap loadImage(String filePath) {
    return BitmapFactory.decodeFile(filePath);
  }

  @Override
  public void onError(String error) {
    resultData.putString("err", "an error occurred with model :(");
  }

  @Override
  public void onResults(List<Classifications> results, long inferenceTime) {
    resultData.putString("results", results.toString());
  }
}