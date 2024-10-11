import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  endpoint: process.env.NEXT_PUBLIC_AWS_ENDPOINT as string,
  forcePathStyle: false,
  region: process.env.NEXT_PUBLIC_AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
  },
});

export const uploadFile = async ({
  fileName,
  file,
  folderName,
}: {
  fileName: string;
  file: File | Buffer;
  folderName: string;
}) => {
  try {
    const param: PutObjectCommandInput = {
      Bucket: "test-my-skills",
      Key: `${process.env.NEXT_PUBLIC_AWS_PLATFORM}/${folderName}/${fileName}`,
      Body: file,
      ACL: "public-read",
    };

    await s3.send(new PutObjectCommand(param));

    return `${process.env.NEXT_PUBLIC_AWS_PLATFORM}/${folderName}/${fileName}`;
  } catch (err) {
    throw err;
  }
};
