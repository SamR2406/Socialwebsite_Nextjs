"use client";

import { useEffect, useState } from "react";
import { SocialCard } from "@/components/social-card";

export const metadata = {
  title: "Liked | Sheffgram",
};

export default function LikedPage() {
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("likedPosts");
      if (!raw) return setLiked([]);
      setLiked(JSON.parse(raw));
    } catch (e) {
      setLiked([]);
    }
  }, []);

  if (liked.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Liked posts</h1>
            <p className="text-sm text-slate-600">
              Posts you have liked will appear here.
            </p>
          </header>
          <div className="text-sm text-slate-600">No liked posts yet.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Liked posts</h1>
          <p className="text-sm text-slate-600">
            Posts you have liked will appear here.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-5">
          {liked.map((post) => (
            <SocialCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
