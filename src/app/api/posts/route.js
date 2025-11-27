import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getPosts, savePosts, uploadImage } from "@/lib/cloudinary";

function normalizeHandle(handle, user) {
  if (!handle && !user) return "";
  if (!handle) return `#${user.toLowerCase().replace(/\s+/g, "")}`;
  return handle.startsWith("#") ? handle : `#${handle}`;
}

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json({ posts });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { user, handle, title, content, mood = "Community", photoData } = body;

    if (!user || !title || !content) {
      return NextResponse.json(
        { error: "Name, title, and story are required." },
        { status: 400 }
      );
    }

    const { url: photo, publicId: photoPublicId } = await uploadImage(
      photoData,
      "posts"
    );

    const post = {
      id: randomUUID(),
      user,
      handle: normalizeHandle(handle, user),
      title,
      content,
      mood,
      createdAt: new Date().toISOString(),
      photo,
      photoPublicId,
    };

    const existing = await getPosts();
    const nextPosts = [post, ...existing];
    await savePosts(nextPosts);

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error creating post", error);
    return NextResponse.json(
      { error: "Unable to save post right now." },
      { status: 500 }
    );
  }
}
