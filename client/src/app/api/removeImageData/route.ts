import { NextRequest, NextResponse } from "next/server";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/firebase/firebase";

export async function POST(request: NextRequest) {
  try {
    const { fileName } = await request.json();

    const imageRef = ref(storage, `images/${fileName}.png`);
    const jsonRef = ref(storage, `metadata/${fileName}.json`);

    deleteObject(imageRef);
    deleteObject(jsonRef);

    return NextResponse.json({
      success: true,
      message: `Items with name "${fileName}" are deleted`
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
