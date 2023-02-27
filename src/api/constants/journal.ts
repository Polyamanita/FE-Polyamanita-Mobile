export interface Instance {
  dateFound: string;
  imageLink: string;
  latitude: number;
  location: string;
  longitude: number;
  s3key: string;
}

export interface CaptureInstance {
  captureID: string;
  instances: Instance[];
  notes: string;
  timesFound: number;
  userID: string;
}

export type Captures = CaptureInstance[];
