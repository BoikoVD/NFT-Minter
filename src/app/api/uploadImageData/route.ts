import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, fileName } = await request.json();

    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imgBlob = new Blob([response.data], { type: "image/png" });

    const imageRef = ref(storage, `images/${fileName}.png`);
    const imgSnapshot = await uploadBytes(imageRef, imgBlob);
    const firebaseImgUrl = await getDownloadURL(imgSnapshot.ref);

    var jsonMetaData = {
      name: `Minter AI NFT #${fileName}`,
      description: "The NFT created with Minter",
      image: firebaseImgUrl,
      edition: 1,
      attributes: [
        {
          trait_type: "Season",
          value: "1"
        }
      ]
    };
    var jsonString = JSON.stringify(jsonMetaData);
    var jsonBlob = new Blob([jsonString], { type: "application/json" });

    const jsonRef = ref(storage, `metadata/${fileName}.json`);
    const jsonSnapshot = await uploadBytes(jsonRef, jsonBlob);
    const firebaseJsonUrl = await getDownloadURL(jsonSnapshot.ref);

    return NextResponse.json({
      success: true,
      message: "Data received and API call successful",
      fetchImageResponse: response.data,
      firebaseImgUrl: firebaseImgUrl,
      firebaseJsonUrl: firebaseJsonUrl
    });
  } catch (e: unknown) {
    console.error("Error processing request:", e);
    const error = e as { code?: number; message?: string };
    return NextResponse.json({
      success: false,
      message: error?.message ?? "Something went wrong...",
      error: error
    });
  }
}
