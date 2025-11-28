"use client";

import { useState, useRef, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { SocialCard } from "@/components/social-card";

export default function ChatPage() {
  const [user, loadingAuth] = useAuthState(auth);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Chat</h1>
            <p className="text-sm text-slate-600">
              Sign in with Google to join the chat. Messages sync live from Firestore.
            </p>
          </div>
          <AuthControls user={user} loading={loadingAuth} />
        </header>
        {user ? (
          <ChatRoom user={user} />
        ) : (
          <p className="text-sm text-slate-600">
            You need to sign in to send and view messages.
          </p>
        )}
      </div>
    </div>
  );
}

function AuthControls({ user, loading }) {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  if (loading) {
    return <span className="text-sm text-slate-500">Checking auth…</span>;
  }

  return user ? (
    <div className="flex items-center gap-3">
      {user.photoURL ? (
        <img
          src={user.photoURL}
          alt={user.displayName || "User"}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-200"
        />
      ) : null}
      <div className="text-sm">
        <p className="font-semibold text-slate-900">
          {user.displayName || user.email}
        </p>
        <p className="text-slate-500">{user.email}</p>
      </div>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
      >
        Sign out
      </button>
    </div>
  ) : (
    <button
      type="button"
      onClick={handleSignIn}
      className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
    >
      Sign in with Google
    </button>
  );
}

function ChatRoom({ user }) {
  const [formValue, setFormValue] = useState("");
  const dummyRef = useRef(null);

  const messagesRef = collection(db, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"), limit(50));
  const [messages = [], loading, error] = useCollectionData(messagesQuery, {
    idField: "id",
  });

  useEffect(() => {
    if (dummyRef.current) {
      dummyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue.trim()) return;
    try {
      await addDoc(messagesRef, {
        text: formValue.trim(),
        createdAt: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName || user.email || "Anonymous",
        photoURL: user.photoURL || "",
      });
      setFormValue("");
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {loading && <p className="text-sm text-slate-500">Loading messages…</p>}
        {error && (
          <p className="text-sm text-rose-600">
            Could not load messages right now.
          </p>
        )}
        <div className="flex flex-col-reverse gap-3 max-h-[420px] overflow-y-auto pr-2">
          <span ref={dummyRef} aria-hidden />
          {messages?.map((msg) => (
            <Message key={msg.id} message={msg} currentUid={user.uid} />
          ))}
        </div>
      </div>
      <form
        onSubmit={sendMessage}
        className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <label className="text-sm font-semibold text-slate-700">
          Send a message
        </label>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none ring-emerald-200 transition focus:border-emerald-400 focus:bg-white focus:ring-2"
          placeholder="Say something nice"
        />
        <button
          type="submit"
          disabled={!formValue.trim()}
          className="self-end rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </section>
  );
}

function Message({ message, currentUid }) {
  const isMine = message.uid === currentUid;

  return (
    <div
      className={`flex items-start gap-3 ${
        isMine ? "flex-row-reverse text-right" : ""
      }`}
    >
      {message.photoURL ? (
        <img
          src={message.photoURL}
          alt={message.displayName || "User"}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-200"
        />
      ) : null}
      <div
        className={`rounded-2xl border px-4 py-3 shadow-sm ${
          isMine
            ? "border-emerald-100 bg-emerald-50 text-emerald-900"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        <p className="text-xs font-semibold text-slate-500">
          {message.displayName || "Anonymous"}
        </p>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
}
