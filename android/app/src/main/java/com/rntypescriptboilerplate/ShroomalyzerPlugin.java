package com.rntypescriptboilerplate;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.media.Image;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.jetbrains.annotations.NotNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;


public class ShroomalyzerPlugin extends ReactContextBaseJavaModule {
  public ShroomalyzerPlugin(ReactApplicationContext reactContext) {
    super(reactContext); // required by React Native.
  }

  // Identifyer so javascript can read native plugin.
  public String getName() {
    return "Shroomalyze";
  }

  @ReactMethod
  public void sayTest(Callback error, Callback success) {
    try {
      System.out.println("Greetings from Java");
      success.invoke("Callback : Greetings from Java");
    } catch (IllegalViewOperationException e) {
      error.invoke(e.getMessage());
    }
  }
}