"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";

const storageKey = "social-posts";

const moodTone = {
  Community: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Advice: "bg-sky-50 text-sky-700 border-sky-100",
  Lifestyle: "bg-amber-50 text-amber-700 border-amber-100",
  Update: "bg-indigo-50 text-indigo-700 border-indigo-100",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Avatar({ name }) {
  const initials = useMemo(() => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [name]);

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-semibold text-white shadow-sm">
      {initials}
    </div>
  );
}

function SocialCard({ post }) {
  const tone = moodTone[post.mood] || "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {post.photo ? (
          <img
            src={post.photo}
            alt={post.user}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-emerald-200"
          />
        ) : (
          <Avatar name={post.user} />
        )}
        <div className="flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
            <span className={classNames("rounded-full border px-3 py-1 text-xs font-medium", tone)}>
              {post.mood}
            </span>
          </div>
          <p className="text-sm text-slate-600">
            {post.user} <span className="text-slate-400">{post.handle}</span>
          </p>
          <p className="text-xs text-slate-400">{post.time}</p>
        </div>
      </div>
      <p className="mt-4 text-base leading-relaxed text-slate-700">{post.content}</p>
    </article>
  );
}

function getStoredPosts() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Error reading stored posts", error);
    return [];
  }
}

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getStoredPosts());
    const sync = () => setPosts(getStoredPosts());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Published posts</h1>
          <p className="text-sm text-slate-600">
            Create new posts from the Post tab; they appear here instantly.
          </p>
        </header>
        {posts.length === 0 ? (
          <div className="space-y-2 text-sm text-slate-600">
            <p>No posts yet.</p>
            <p>
              Head to the <a className="font-semibold text-emerald-700" href="/post">Post</a> tab to publish your first update.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {posts.map((post) => (
              <SocialCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
