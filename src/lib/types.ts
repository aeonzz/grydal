import { ErrorResponse, PhotosWithTotalResults } from "pexels";

export type PhotoResponse = {
  data: PhotosWithTotalResults | ErrorResponse | null;
  error: string | null;
};
