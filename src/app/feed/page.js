"use client";

import { posts, users } from "../messages";
import { useState, useEffect } from "react";

export default function BlogFeed() {
  const [bookmarkIds, setBookmarkIds] = useState(() => {
    try {
      const stored = localStorage.getItem("bookmarks");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("bookmarks", JSON.stringify(bookmarkIds));
    } catch (e) {
      // ignore write errors
    }
  }, [bookmarkIds]);

  const toggleBookmark = (postId) => {
    setBookmarkIds((prev) => {
      if (prev.includes(postId)) return prev.filter((id) => id !== postId);
      return [...prev, postId];
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const author = users.find((u) => u.id === post.userId);
          const isBookmarked = bookmarkIds.includes(post.id);

          return (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              {/* Author */}
              <div className="flex items-center mb-4">
                <img
                  src={author?.profilePic}
                  alt={author?.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {author?.name}
                  </p>
                  <p className="text-xs text-gray-500">{author?.bio}</p>
                </div>
              </div>

              {/* Post */}
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                <em>{post.date}</em>
              </p>
              <p className="text-gray-700 leading-relaxed">{post.content}</p>

              {/* Bookmark button */}
              <button
                onClick={() => toggleBookmark(post.id)}
                className={`mt-4 px-3 py-1 rounded ${
                  isBookmarked
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
