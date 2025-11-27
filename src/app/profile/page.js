"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    photoData: "",
  });
  const [fileKey, setFileKey] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch("/api/profile", { cache: "no-store" });
        const data = await response.json();
        if (!cancelled && data.profile) {
          setProfile(data.profile);
          setForm({
            name: data.profile.name || "",
            bio: data.profile.bio || "",
            photoData: data.profile.photo || "",
          });
        }
      } catch (err) {
        console.error("Error loading profile", err);
        if (!cancelled) setError("Could not load your profile yet.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

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
    setError("");
    setMessage("");
    if (!form.name) {
      setError("Please add your name before saving.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to save profile.");
      }
      setProfile(data.profile);
      setMessage("Profile saved. Check the preview below.");
      setFileKey((k) => k + 1);
    } catch (err) {
      console.error("Error saving profile", err);
      setError(err.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8">
        <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Profile
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Create your profile</h1>
            <p className="text-sm text-slate-600">
              Add your details and a photo. Saved info appears in the preview and is stored in Cloudinary for reuse.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-200 transition focus:border-emerald-400 focus:bg-white focus:ring-2"
              />
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
              <label className="text-sm font-semibold text-slate-700">Bio</label>
              <textarea
                rows={4}
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                placeholder="Tell people about yourself..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-200 transition focus:border-emerald-400 focus:bg-white focus:ring-2"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
            {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
            {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          </form>
        </section>

        <section className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Profile preview</h2>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
              Saved remotely
            </span>
          </div>
          {loading ? (
            <p className="text-sm text-slate-500">Loading profile…</p>
          ) : profile ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-emerald-200"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-slate-900">{profile.name}</p>
                  <p className="text-sm text-slate-700">{profile.bio}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No profile yet. Save your info to see it here.</p>
          )}
        </section>
      </div>
    </div>
  );
}
