// app/api/generate-image/route.ts
"use server";
import { createCanvas, loadImage } from "canvas";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { uploadFile } from "./upload";

export const generateimage = async ({
  name,
  score,
  testName,
}: {
  name: string;
  score: string;
  testName: string;
}) => {
  // Load the base image
  const baseImage = await loadImage("public/base_image.png");
  const canvas = createCanvas(400, 200);
  const ctx = canvas.getContext("2d");

  // Draw the base image
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

  // Set text styles
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";

  ctx.fillText(`Name: ${name}`, 10, 30);
  ctx.fillText(`Test: ${testName}`, 10, 70);
  ctx.fillText(`Score: ${score}`, 10, 110);

  const imageName = `${name.replace(/\s+/g, "_")}_score_image-6.png`;
  const outputPath = path.join(process.cwd(), "public", imageName);

  const fileBuffer = canvas.toBuffer("image/png");
  await fs.writeFile(outputPath, fileBuffer);
  const folderName = "share-certify";

  console.log("file", fileBuffer);
  console.log("fileBuffer", typeof fileBuffer);

  try {
    const uploadedImagePath = await uploadFile({
      fileName: imageName,
      file: fileBuffer,
      folderName,
    });

    console.log(uploadedImagePath);
    return uploadedImagePath;
  } catch (error) {
    console.log("error", error);
    return;
  }
};
