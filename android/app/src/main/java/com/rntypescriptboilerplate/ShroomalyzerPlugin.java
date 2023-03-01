package com.rntypescriptboilerplate;

import java.io.*;
import java.lang.*;
import java.net.*;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.Image;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import org.jetbrains.annotations.NotNull;

import com.facebook.react.bridge.*;
import com.facebook.react.uimanager.IllegalViewOperationException;


public class ShroomalyzerPlugin extends ReactContextBaseJavaModule {
  public ShroomalyzerPlugin(ReactApplicationContext reactContext) {
    super(reactContext); // required by React Native.
  }

  // Identifyer so javascript can read native plugin.
  public String getName() {
    return "Shroomalyze";
  }

  // This 
  @ReactMethod
  public void RunModel(String filePath, Callback success, Callback error) {
    try {
      WritableMap resultData = new WritableNativeMap();
      Bitmap bitmap = loadImage(filePath);

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
}