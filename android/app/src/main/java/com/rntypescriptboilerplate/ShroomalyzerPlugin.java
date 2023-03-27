package com.rntypescriptboilerplate;

import java.io.*;
import java.lang.*;
import java.net.*;
import java.nio.channels.FileChannel;
import java.nio.MappedByteBuffer;
import java.util.*;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.AssetFileDescriptor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.Image;
import android.util.Log;

import com.facebook.react.bridge.*;

import org.tensorflow.lite.DataType;
import org.tensorflow.lite.Interpreter;
import org.tensorflow.lite.support.common.*;
import org.tensorflow.lite.support.image.*;
import org.tensorflow.lite.support.image.ops.*;
import org.tensorflow.lite.support.label.TensorLabel;
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer;

public class ShroomalyzerPlugin extends ReactContextBaseJavaModule {
  private ReactApplicationContext context;
  private static final String MODEL = "mushroom.tflite"; // location of tflite model
  final String LABELS = "labels.txt";
  private static final int INPUT_TENSOR_WIDTH = 256;
  private static final int OUTPUT_TENSOR_WIDTH = 10;

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

  private TensorImage processImage(Bitmap image) {
    int sq_size = image.getHeight();
    if (sq_size < image.getWidth()) {
      sq_size = image.getWidth();
    }

    // Resize and pad
    ImageProcessor imageProcessor = new ImageProcessor.Builder()
        .add(new ResizeWithCropOrPadOp(sq_size, sq_size))
        .add(new ResizeOp(INPUT_TENSOR_WIDTH, INPUT_TENSOR_WIDTH, ResizeOp.ResizeMethod.BILINEAR))
        .build();

    TensorImage tensorImage = new TensorImage(DataType.FLOAT32);
    tensorImage.load(image);
    tensorImage = imageProcessor.process(tensorImage);

    return tensorImage;
  }

  private TensorBuffer classifyImage(TensorImage image) {
    // Create output buffer
    TensorBuffer probabilityBuffer = TensorBuffer.createFixedSize(
        new int[] { 1, OUTPUT_TENSOR_WIDTH },
        DataType.FLOAT32);

    // Load model
    MappedByteBuffer model = null;
    try {
      model = loadModelFile();
    } catch (IOException e) {
      Log.e("tfliteSupport", "Error loading model file", e);
      return null;
    }

    // run model
    Interpreter interpreter = new Interpreter(model);
    interpreter.run(image.getBuffer(), probabilityBuffer.getBuffer());
    interpreter.close();

    // Apply softmax function
    SoftMax softmax = new SoftMax(probabilityBuffer.getFloatArray());
    probabilityBuffer.loadArray(softmax.getValue());

    return probabilityBuffer;
  }

  private Map<String, Float> addLabels(TensorBuffer results, String labelsPath) {
    List<String> associatedAxisLabels = null;

    try {
      associatedAxisLabels = FileUtil.loadLabels(this.context, labelsPath);
    } catch (IOException e) {
      Log.e("tfliteSupport", "Error reading label file", e);
      return null;
    }

    TensorProcessor probabilityProcessor = new TensorProcessor.Builder().build();

    // Map of labels and their corresponding probability
    TensorLabel labels = new TensorLabel(associatedAxisLabels,
        probabilityProcessor.process(results));

    // Create a map to access the result based on label
    Map<String, Float> resultsMap = labels.getMapWithFloatValue();

    return resultsMap;
  }

  private void passResults(Callback cb, Map<String, Float> results) {
    WritableNativeMap bridge = new WritableNativeMap();
    for (Map.Entry<String, Float> entry : results.entrySet()) {
      bridge.putDouble(entry.getKey(), entry.getValue());
    }
    cb.invoke(bridge);
  }

  private void passError(Callback cb, String errorMessage) {
    WritableNativeMap bridge = new WritableNativeMap();
    bridge.putString("error", errorMessage);
    cb.invoke(bridge);
  }

  @ReactMethod
  public void RunModel(String filePath, Callback success, Callback error) {
    // Load image from file
    Bitmap bm = loadImage(filePath);
    if (bm == null) {
      passError(error, "failed to load image");
      return;
    }

    // Process image (resize + pad)
    TensorImage tensorImage = processImage(bm);

    // Perform classification, store results in probabilityBuffer
    TensorBuffer results = classifyImage(tensorImage);
    if (results == null) {
      passError(error, "failed to load/run model");
      return;
    }

    // Create map from results using class labels
    Map<String, Float> resultsWithLabels = addLabels(results, LABELS);
    if (resultsWithLabels == null) {
      passError(error, "failed to add class labels");
      return;
    }

    // Pass back to frontend
    passResults(success, resultsWithLabels);
  }

  private Bitmap loadImage(String filePath) {
    return BitmapFactory.decodeFile(filePath);
  }
}