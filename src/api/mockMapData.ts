// No need to get all the data of a capture, just get enough to be able to

import { Instance } from "./constants/journal";

// search the DB later.
interface CapturePoint {
  userID: string;
  captureID: string;
  instance: Instance;
}

export const captures = [
  {
    userID: "some-id",
    captureID: "27",
    instance: {
      dateFound: "2023-03-20T17:21:00.000Z",
      imageLink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Amanita_muscaria_3_vliegenzwammen_op_rij.jpg/1200px-Amanita_muscaria_3_vliegenzwammen_op_rij.jpg",
      latitude: 28.6016,
      longitude: -81.2005,
      location: "UCF",
      s3key: "",
    },
  },
  {
    userID: "some-id",
    captureID: "53",
    instance: {
      dateFound: "2023-03-20T16:21:00.000Z",
      imageLink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Amanita_muscaria_3_vliegenzwammen_op_rij.jpg/1200px-Amanita_muscaria_3_vliegenzwammen_op_rij.jpg",
      latitude: 28.16,
      longitude: -81.1,
      location: "UCF",
      s3key: "",
    },
  },
] as CapturePoint[];
