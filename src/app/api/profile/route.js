import { NextResponse } from "next/server";
import { getProfile, saveProfile, uploadImage, deleteAsset } from "@/lib/cloudinary";

export async function GET() {
  const profile = await getProfile();
  return NextResponse.json({ profile });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, bio = "", photoData } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required to save a profile." },
        { status: 400 }
      );
    }

    const existing = await getProfile();
    let photo = existing?.photo || "";
    let photoPublicId = existing?.photoPublicId || "";

    if (photoData) {
      const uploaded = await uploadImage(photoData, "profiles");
      photo = uploaded.url;
      if (photoPublicId && photoPublicId !== uploaded.publicId) {
        await deleteAsset(photoPublicId);
      }
      photoPublicId = uploaded.publicId;
    }

    const profile = {
      name,
      bio,
      photo,
      photoPublicId,
      updatedAt: new Date().toISOString(),
    };

    await saveProfile(profile);
    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error saving profile", error);
    return NextResponse.json(
      { error: "Unable to save profile right now." },
      { status: 500 }
    );
  }
}
