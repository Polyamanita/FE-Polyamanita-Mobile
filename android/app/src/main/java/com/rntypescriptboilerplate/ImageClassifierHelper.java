package com.rntypescriptboilerplate;

import android.content.Context;
import android.graphics.Bitmap;
import android.os.SystemClock;
import android.util.Log;
import java.io.IOException;
import java.util.List;
import org.tensorflow.lite.gpu.CompatibilityList;
import org.tensorflow.lite.support.image.ImageProcessor;
import org.tensorflow.lite.support.image.TensorImage;
import org.tensorflow.lite.support.image.ops.ResizeOp;
import org.tensorflow.lite.support.image.ops.ResizeWithCropOrPadOp;
import org.tensorflow.lite.task.core.BaseOptions;
import org.tensorflow.lite.task.vision.classifier.Classifications;
import org.tensorflow.lite.task.vision.classifier.ImageClassifier;

/** Helper class for wrapping Image Classification actions */
public class ImageClassifierHelper {
	private static final String TAG = "ImageClassifierHelper";
	private static final int DELEGATE_CPU = 0;
	private static final int DELEGATE_GPU = 1;
	private static final String MODEL = "mushroom.tflite"; // location of tflite model
	private float threshold;
	private int numThreads;
	private int maxResults;
	private int currentDelegate;
	private final int inputSize;
	private final Context context;
	private final ClassifierListener imageClassifierListener;
	private ImageClassifier imageClassifier;
	private static final int TENSOR_WIDTH = 256;

	// useful for initialization
	private ImageClassifierHelper(Float threshold, int numThreads, int maxResults, int inputSize, Context context, ClassifierListener imageClassifierListener) {
		this.threshold = threshold;
		this.numThreads = numThreads;
		this.maxResults = maxResults;
		this.currentDelegate = DELEGATE_GPU;
		this.inputSize = inputSize;
		this.context = context;
		this.imageClassifierListener = imageClassifierListener;
		setupImageClassifier();
	}

	// USE THIS ONE FOR THE APP
	public static ImageClassifierHelper create(Context context, ClassifierListener listener) {

		return new ImageClassifierHelper(
			0.5f,
			2,
			3,
			TENSOR_WIDTH,
			context,
			listener
		);
	}

	public float getThreshold() {
		return threshold;
	}

	public void setThreshold(float threshold) {
		this.threshold = threshold;
	}

	public int getNumThreads() {
		return numThreads;
	}

	public void setNumThreads(int numThreads) {
		this.numThreads = numThreads;
	}

	public int getMaxResults() {
		return maxResults;
	}

	public void setMaxResults(int maxResults) {
		this.maxResults = maxResults;
	}

	public int getInputSize() {
		return inputSize;
	}

	private void setupImageClassifier() {
		ImageClassifier.ImageClassifierOptions.Builder optionsBuilder =
			ImageClassifier.ImageClassifierOptions.builder()
				.setScoreThreshold(threshold)
				.setMaxResults(maxResults);

		BaseOptions.Builder baseOptionsBuilder =
			BaseOptions.builder().setNumThreads(numThreads);

		switch (currentDelegate) {
			case DELEGATE_CPU:
				// Default
				break;

			case DELEGATE_GPU:
				if (new CompatibilityList().isDelegateSupportedOnThisDevice()) {
					baseOptionsBuilder.useGpu();
				} else {
					Log.e(TAG, "This device does not support GPU usage. Swapping actions to CPU");
					currentDelegate = DELEGATE_CPU;
				}
				break;
		}

		try {
			imageClassifier = ImageClassifier.createFromFileAndOptions(context, MODEL, optionsBuilder.build());
		}
		catch (IOException e) {

			imageClassifierListener.onError("Image classifier failed to initialize. See error logs for details");
			Log.e(TAG, "TFLite failed to load model with error: " + e.getMessage());
		}
	}

	public void classify(Bitmap image) {

		Log.d("ImageClassifierHelper.classify()", "We in bois\n\n\n\n\n");
		if (imageClassifier == null) {
			setupImageClassifier();
		}

		// Inference time is the difference between the system time at the start
		// and finish of the process
		long predictionTime = SystemClock.uptimeMillis();

		// the larger value between height and width
		int sq_size = image.getHeight();
		if(image.getHeight() < image.getWidth()) {
			sq_size = image.getWidth();
		}

		// Create preprocessor for the image
		ImageProcessor imageProcessor =
			new ImageProcessor.Builder()
			.add(new ResizeWithCropOrPadOp(sq_size, sq_size)) // pad image into a square
			.add(new ResizeOp(inputSize, inputSize, ResizeOp.ResizeMethod.BILINEAR)) // resize squared img and downscale
			.build();

		// Perform the preprocessing
		TensorImage tensorImage = imageProcessor.process(TensorImage.fromBitmap(image));

		// Classify the processed image
		imageClassifier.classify(tensorImage);

		List<Classifications> result = imageClassifier.classify(tensorImage);

		predictionTime = SystemClock.uptimeMillis() - predictionTime;
		imageClassifierListener.onResults(result, predictionTime);
	}

	public void clearImageClassifier() {
		imageClassifier = null;
	}

	// Listener for passing results back to calling class
	public interface ClassifierListener {
		void onError(String error);
		void onResults(List<Classifications> results, long inferenceTime);
	}
}