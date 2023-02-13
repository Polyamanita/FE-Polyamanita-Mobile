export interface instance {
    dateFound: string,
    imageLink: string,
    latitude: number,
    location: string,
    longitude: number,
    s3key: string,
}

export interface CaptureInstance {
    captureID: string,
    instances: instance[],
    notes: string,
}

export type Captures = CaptureInstance[];
