"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { generateimage } from "../../utils/generate-image";

export default function Home() {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [testName, setTestName] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const [currentUrl, setCurrentUrl] = useState(""); // Store the current URL for metadata
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href); // Set the current URL after component mounts
    }
  }, []);

  const generateImage = async () => {
    const res = await generateimage({ name, score, testName });
    setImageSrc(res as string);
    console.log(res);
  };

  const imageUrl = `${process.env.NEXT_PUBLIC_AWS_BUCKETURL}/${imageSrc}`;

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(linkedInUrl, "_blank");
    console.log(linkedInUrl);
  };

  return (
    <div>
      <Head>
        <title>Score Image Generator</title>
        <meta property="og:title" content={`${testName} - ${name}'s Score`} />
        <meta property="og:description" content={`Score: ${score}`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={currentUrl} />{" "}
        {/* Safe client-side check */}
      </Head>

      <h1>Score Image Generator</h1>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Your Score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <input
        type="text"
        placeholder="Test Name"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
      />
      <button onClick={generateImage}>Generate Image</button>

      {imageSrc && (
        <>
          <Image src={imageUrl} alt="Score" width={500} height={500} />
          <button onClick={shareOnLinkedIn}>Share on LinkedIn</button>
        </>
      )}
    </div>
  );
}
