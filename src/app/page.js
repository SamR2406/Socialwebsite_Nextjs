"use client";

import { useEffect, useState } from "react";
import { SocialCard } from "@/components/social-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Published posts</h1>
          <p className="text-sm text-slate-600">
            Create new posts from the Post tab; they appear here instantly.
          </p>
        </header>
        <PostsFeed />
      </div>
    </div>
  );
}

function PostsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch("/api/posts", { cache: "no-store" });
        const data = await response.json();
        if (!cancelled) setPosts(data.posts || []);
      } catch (err) {
        console.error("Error loading posts", err);
        if (!cancelled) setError("Could not load posts right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading posts…</p>;
  }

  if (error) {
    return <p className="text-sm text-rose-600">{error}</p>;
  }

  if (posts.length === 0) {
    return (
      <div className="space-y-2 text-sm text-slate-600">
        <p>No posts yet.</p>
        <p>
          Head to the <a className="font-semibold text-emerald-700" href="/post">Post</a> tab to publish your first update.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      {posts.map((post) => (
        <SocialCard key={post.id} post={post} />
      ))}
    </div>
  );
}
