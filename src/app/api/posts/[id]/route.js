import { NextResponse } from "next/server";
import { deleteAsset, getPosts, savePosts } from "@/lib/cloudinary";

export async function DELETE(_request, { params }) {
  const { id } = params;

  try {
    const posts = await getPosts();
    const post = posts.find((item) => item.id === id);
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    if (post.photoPublicId) {
      await deleteAsset(post.photoPublicId);
    }

    const updated = posts.filter((item) => item.id !== id);
    await savePosts(updated);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting post", error);
    return NextResponse.json(
      { error: "Unable to delete post right now." },
      { status: 500 }
    );
  }
}
