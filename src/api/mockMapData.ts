// No need to get all the data of a capture, just get enough to be able to
// search the DB later.
interface capturePoint {
  userID: string;
  captureID: string;
  latitude: number;
  longitude: number;
}

// and when we select a point, call API to search captureID to return
// the following information.
interface capture extends capturePoint {
  dateFound: string;
  imageLink: string;
  location: string;
  s3Key: string;
}

export const captures = [
  {
    userID: "person1",
    captureID: "27",
    latitude: 28.6016,
    longitude: -81.2005,
  },
  {
    userID: "person2",
    captureID: "53",
    latitude: 28.16,
    longitude: -81.1,
  },
] as capturePoint[];

export const previewImage = {
  ...captures[0],
  dateFound: new Date().toUTCString(),
  imageLink: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Amanita_muscaria_3_vliegenzwammen_op_rij.jpg/1200px-Amanita_muscaria_3_vliegenzwammen_op_rij.jpg",
  location: "Orlando",
  s3Key: "not sure yet"
} as capture;