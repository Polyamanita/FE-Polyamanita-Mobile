package com.rntypescriptboilerplate;

public class SoftMax {
    private final float[] params;

    public SoftMax(float[] params) {
        this.params = params;
    }

    public float[] getValue() {
        float sum = 0;

        for (int i = 0; i < params.length; i++) {
            params[i] = (float) Math.exp(params[i]);
            sum += params[i];
        }

        if (Float.isNaN(sum) || sum < 0) {
            for (int i = 0; i < params.length; i++) {
                params[i] = (float) 1.0 / params.length;
            }
        } else {
            for (int i = 0; i < params.length; i++) {
                params[i] = params[i] / sum;
            }
        }

        return params;
    }
}