package com.rntypescriptboilerplate;

import java.io.*;
import java.lang.*;
import java.net.*;
import java.util.*;

import android.util.Log;
import android.annotation.SuppressLint;
import android.content.Context;
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


public class ShroomalyzerPlugin extends ReactContextBaseJavaModule implements ImageClassifierHelper.ClassifierListener {
  private ReactApplicationContext context;
  public ShroomalyzerPlugin(ReactApplicationContext reactContext) {
    super(reactContext); // required by React Native.
    context  = reactContext;
  }

  // Identifyer so javascript can read native plugin.
  public String getName() {
    return "Shroomalyze";
  }

  @ReactMethod
  public void RunModel(String filePath, Callback success, Callback error) {
    try {
      WritableMap resultData = new WritableNativeMap();
      Bitmap bitmap = loadImage(filePath);
      
      Log.d("MARKER", "\n\n\nSTART OF IMAGECLASSIFIER\n\n\n");
      ImageClassifierHelper imageClassifier = ImageClassifierHelper.create(context, this);
      Log.d("MARKER", "\n\n\n IMAGE CLASSIFIER DECLARED \n\n\n");
      imageClassifier.classify(bitmap);

      Log.d("MARKER", "\n\n\n CLASSIFICATION COMPLETE. \n\n\n");
      
      
      resultData.putInt("key1", bitmap.getHeight());
      resultData.putString("key2", "data200");
      // success.invoke("Hello from java!!! " + filePath);
      success.invoke(resultData);
    } catch (IllegalViewOperationException e) {
      error.invoke(e.getMessage());
    }
  }

  private Bitmap loadImage(String filePath) {
    return BitmapFactory.decodeFile(filePath);
  }

  @Override
    public void onError(String error) {}

  @Override
  public void onResults(List<Classifications> results, long inferenceTime) {}
}