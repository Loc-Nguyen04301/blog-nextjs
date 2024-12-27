import AWS from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";


const bucketNameAWS = process.env.NEXT_PUBLIC_REACT_APP_S3_BUCKET_NAME || "";


export const uploadImageToS3 = async (file: File, folderName?: string) => {
  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY,
  });
  const s3 = new AWS.S3({
    region: process.env.NEXT_PUBLIC_REACT_APP_AWS_REGION,
    params: {
      Bucket: bucketNameAWS
    }
  });

  const fileName = `${folderName ? `${folderName}/` : ''}${Date.now()}-${file.name}`;

  const params = {
    Body: file,
    Key: fileName,
    Bucket: bucketNameAWS,
  } as PutObjectRequest

  try {
    const uploadURL = await s3.putObject(params).promise()
    console.log({ uploadURL })
    return "abc"
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}