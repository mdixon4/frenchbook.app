import { FileStorage, Visibility, UnableToCheckFileExistence } from '@flystorage/file-storage'
import { AwsS3StorageAdapter } from '@flystorage/aws-s3'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const config = {
  region: process.env.CACHE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.CACHE_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.CACHE_AWS_SECRET_ACCESS_KEY,
  }
}
const s3Client = new S3Client(config);

const AWS_BUCKET_NAME = process.env.CACHE_AWS_BUCKET_NAME

const adapter = new AwsS3StorageAdapter(s3Client, {
  bucket: AWS_BUCKET_NAME,
  prefix: 'cache-',
})

export const storage = new FileStorage(adapter)

export const getPresignedUrl = (key) => {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: 'cache-/' + key,
  });
  return getSignedUrl(s3Client, command, { expiresIn: 60 * 60 * 24 * 7 });
}

export const fileExists = async (key) => {
  try {
    const exists = await storage.fileExists(key);
    return exists
  } catch (err) {
    if (err instanceof UnableToCheckFileExistence) {
      console.error(err)
      return false
    }
  }
}