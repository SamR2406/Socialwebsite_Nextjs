"use client";

import { posts } from "../messages";
import { useState, useEffect } from "react";

export default function Bookmarks() {
  const [bookmarkIds, setBookmarkIds] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookmarks");
    if (stored) {
      setBookmarkIds(JSON.parse(stored));
    }
  }, []);

  const bookmarkedPosts = posts.filter((p) => bookmarkIds.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-100">
      <h1 className="text-2xl font-bold mb-6">Bookmarked Posts</h1>
      {bookmarkedPosts.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                <em>{post.date}</em>
              </p>
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
