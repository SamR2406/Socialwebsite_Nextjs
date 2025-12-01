/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useEffect, useState } from "react";

const moodTone = {
  Community: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Advice: "bg-sky-50 text-sky-700 border-sky-100",
  Lifestyle: "bg-amber-50 text-amber-700 border-amber-100",
  Update: "bg-indigo-50 text-indigo-700 border-indigo-100",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const diff = Date.now() - date.getTime();
  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year:
      date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
  });
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

export function SocialCard({ post, onDelete, disabled = false }) {
  const tone =
    moodTone[post.mood] || "bg-slate-50 text-slate-700 border-slate-200";
  const displayTime = formatTime(post.createdAt || post.time);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("likedPosts");
      if (!raw) return setLiked(false);
      const arr = JSON.parse(raw);
      const exists = arr.some((p) => p.id === post.id);
      setLiked(Boolean(exists));
    } catch (e) {
      setLiked(false);
    }
  }, [post.id]);

  const toggleLike = () => {
    try {
      const raw = localStorage.getItem("likedPosts");
      const arr = raw ? JSON.parse(raw) : [];
      const exists = arr.find((p) => p.id === post.id);
      let next;
      if (exists) {
        next = arr.filter((p) => p.id !== post.id);
      } else {
        // store the post snapshot
        next = [{ ...post }, ...arr];
      }
      localStorage.setItem("likedPosts", JSON.stringify(next));
      setLiked(!exists);
    } catch (e) {
      console.error("Error toggling like", e);
    }
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div className="flex flex-1 items-start gap-3">
          {post.photo ? (
            <img
              src={post.photo}
              alt={post.user}
              className="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-2 ring-emerald-200"
            />
          ) : (
            <Avatar name={post.user} />
          )}
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900 break-words">
                {post.title}
              </h3>
              <span
                className={classNames(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  tone
                )}
              >
                {post.mood}
              </span>
            </div>
            <p className="text-sm text-slate-600">
              {post.user} <span className="text-slate-400">{post.handle}</span>
            </p>
            <p className="text-xs text-slate-400">{displayTime}</p>
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2 sm:w-auto sm:flex-col sm:items-end">
          <button
            type="button"
            onClick={toggleLike}
            className={classNames(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              liked
                ? "bg-red-50 text-rose-600 border border-rose-100"
                : "text-slate-500 hover:bg-slate-100 border border-transparent"
            )}
            >
              {liked ? "♥ Liked" : "♡ Like"}
            </button>
          {onDelete ? (
            <button
              type="button"
              onClick={() => onDelete(post)}
              disabled={disabled}
              className={classNames(
                "rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600",
                disabled
                  ? "cursor-not-allowed opacity-60 hover:bg-white hover:text-slate-500"
                  : ""
              )}
            >
              {disabled ? "Deleting…" : "Delete"}
            </button>
          ) : null}
        </div>
      </div>
      <p className="mt-4 text-base leading-relaxed text-slate-700 break-words">
        {post.content}
      </p>
    </article>
  );
}
