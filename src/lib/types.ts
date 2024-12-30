import { Photo } from "pexels";

export type PhotosWithBase64 = Photo & {
  base64: string;
};
