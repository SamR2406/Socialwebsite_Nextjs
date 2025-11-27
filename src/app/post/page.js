"use client";



import { useEffect, useState } from "react";
import { SocialCard } from "@/components/social-card";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed right-5 top-5 z-50 flex w-80 flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={classNames(
            "pointer-events-auto flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-lg",
            "animate-slide-in"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            ✓
          </div>
          <div className="flex-1">
            <p className="font-semibold text-emerald-700">Update</p>
            <p className="text-slate-600">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 transition hover:text-slate-700"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    user: "",
    handle: "",
    title: "",
    content: "",
    mood: "Community",
    photoData: "",
  });
  const [fileKey, setFileKey] = useState(0);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch("/api/posts", { cache: "no-store" });
        const data = await response.json();
        if (!cancelled) setPosts(data.posts || []);
      } catch (error) {
        console.error("Error loading posts", error);
        if (!cancelled) {
          addToast("Could not load posts right now.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const addToast = (message) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}`;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setForm((f) => ({ ...f, photoData: "" }));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, photoData: reader.result || "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.user || !form.title || !form.content) {
      addToast("Please add your name, title, and story before posting.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to publish your post.");
      }
      setPosts((prev) => [data.post, ...prev]);
      addToast("Your post was added. Check Home to see it live.");
      setForm({
        user: "",
        handle: "",
        title: "",
        content: "",
        mood: "Community",
        photoData: "",
      });
      setFileKey((k) => k + 1);
    } catch (error) {
      console.error("Error posting update", error);
      addToast(error.message || "Unable to publish right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (post) => {
    try {
      const response = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete post.");
      }
      setPosts((prev) => prev.filter((item) => item.id !== post.id));
      addToast("Post deleted.");
    } catch (error) {
      console.error("Error deleting post", error);
      addToast(error.message || "Could not delete this post.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8">
        <section
          id="add"
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Post
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Create a new post</h1>
            <p className="text-sm text-slate-600">
              Fill in the details and publish. Your post will appear on Home once submitted and is stored in Cloudinary.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Display name</label>
                <input
                  type="text"
                  value={form.user}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, user: e.target.value }))
                  }
                  placeholder="Lena Park"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-200 transition focus:border-emerald-400 focus:bg-white focus:ring-2"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Hashtag (optional)</label>
                <input
                  type="text"
                  value={form.handle}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, handle: e.target.value }))
                  }
                  placeholder="#lenapark"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-200 transition focus:border-emerald-400 focus:bg-white focus:ring-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Photo (optional)</label>
              <input
                key={fileKey}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-emerald-300"
              />
              {form.photoData ? (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                  <img
                    src={form.photoData}
                    alt="Preview"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-200"
                  />
                  <p className="text-sm font-semibold text-slate-700">Preview ready</p>
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Weekend plans?"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-200 transition focus:border-emerald-400 focus:bg-white focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Story</label>
              <textarea
                rows={4}
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                placeholder="Share an update with friends..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-200 transition focus:border-emerald-400 focus:bg-white focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Mood</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Community", "Advice", "Lifestyle", "Update"].map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, mood }))}
                    className={classNames(
                      "rounded-xl border px-3 py-2 text-xs font-semibold transition",
                      form.mood === mood
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300 hover:bg-white"
                    )}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Publishing..." : "Publish post"}
            </button>
          </form>
        </section>

        <section className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Preview</h2>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
              Also visible on Home
            </span>
          </div>
          {loading ? (
            <p className="text-sm text-slate-500">Loading posts…</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-slate-500">
              No posts yet. Publish using the form above.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5">
              {posts.map((post) => (
                <SocialCard key={post.id} post={post} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </section>
      </div>
      <ToastStack
        toasts={toasts}
        onDismiss={(id) =>
          setToasts((prev) => prev.filter((toast) => toast.id !== id))
        }
      />
    </div>
  );
}
