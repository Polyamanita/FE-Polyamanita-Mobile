export interface S3LinkResponse {
  links: [{ s3Key: string; uploadLink: string }];
}
