package com.rntypescriptboilerplate;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.media.Image;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;
import org.jetbrains.annotations.NotNull;

// Vision Camera libraries.
import androidx.camera.core.ImageProxy;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

public class ShroomalyzerProcessorPlugin extends FrameProcessorPlugin {
  @Nullable
  @Override
  public Object callback(ImageProxy imageProxy, Object[] params) {
    Image image = imageProxy.getImage();
    // If ImageProxy is empty
    if (image == null) {
      return null;
    }

    Bitmap bitmap = Bitmap.createBitmap(image.getWidth(), image.getHeight(), Bitmap.Config.ARGB_8888);
    return bitmap;
  }

  ShroomalyzerProcessorPlugin(Context context) {
    super("shroomalyze");
  }
}