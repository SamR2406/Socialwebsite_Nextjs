"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

export default function ChatPage() {
  const [user, authLoading] = useAuthState(auth);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const messagesQuery = useMemo(
    () =>
      query(
        collection(db, "messages"),
        orderBy("createdAt", "desc"),
        limit(50)
      ),
    []
  );

  const [messages = [], loadingMessages] = useCollectionData(messagesQuery, {
    idField: "id",
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  async function handleSend(e) {
    e.preventDefault();
    if (!user) {
      setError("Please sign in to send a message.");
      return;
    }
    const text = inputRef.current?.value?.trim();
    if (!text) return;

    try {
      await addDoc(collection(db, "messages"), {
        text,
        uid: user.uid,
        name: user.displayName || "Anonymous",
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
      });
      inputRef.current.value = "";
      setStatus("Message sent");
      setTimeout(() => setStatus(""), 1500);
    } catch (err) {
      console.error("Failed to send message", err);
      setError("Could not send your message. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Chat</h1>
            <p className="text-sm text-slate-600">
              Talk in real time. Sign in to post a message.
            </p>
          </div>
          <AuthButton user={user} loading={authLoading} />
        </div>

        {status && (
          <p className="mb-3 text-sm text-emerald-700 bg-emerald-50 px-3 py-2 rounded">
            {status}
          </p>
        )}
        {error && (
          <p className="mb-3 text-sm text-rose-700 bg-rose-50 px-3 py-2 rounded">
            {error}
          </p>
        )}

        <div className="grid gap-6">
          <section className="bg-white rounded-xl shadow-sm border border-slate-200">
            <header className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-800">Room</h2>
              <p className="text-xs text-slate-500">
                {loadingMessages
                  ? "Loading messages…"
                  : `${messages.length} recent message${
                      messages.length === 1 ? "" : "s"
                    }`}
              </p>
            </header>
            <div className="max-h-[55vh] sm:max-h-[420px] overflow-y-auto px-4 py-4 space-y-4">
              {loadingMessages && (
                <p className="text-sm text-slate-500">Loading…</p>
              )}
              {!loadingMessages && messages.length === 0 && (
                <p className="text-sm text-slate-500">
                  No messages yet. Start the conversation!
                </p>
              )}
              {!loadingMessages &&
                messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwn={user?.uid === msg.uid}
                  />
                ))}
            </div>
            <footer className="border-t border-slate-100 px-4 py-3">
              <form
                onSubmit={handleSend}
                className="flex items-center gap-3"
                aria-label="Send a message"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={
                    user ? "Say something nice…" : "Sign in to start chatting"
                  }
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
                  disabled={!user}
                />
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-emerald-700 disabled:opacity-60"
                  disabled={!user}
                >
                  Send
                </button>
              </form>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
}

function AuthButton({ user, loading }) {
  if (loading) {
    return (
      <div className="text-sm text-slate-500 bg-white border border-slate-200 rounded-full px-3 py-2 shadow-sm">
        Checking auth…
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex w-full sm:w-auto items-center gap-3 sm:gap-4 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
        {user.photoURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.photoURL}
            alt={user.displayName || "User avatar"}
            className="h-9 w-9 rounded-full border border-slate-200"
          />
        ) : null}
        <div className="flex w-full sm:w-auto flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 text-sm leading-tight">
          <p className="font-semibold text-slate-800 leading-tight text-base sm:text-sm">
            {user.displayName || "Signed in"}
          </p>
          <button
            className="self-start sm:self-auto rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-100 font-semibold"
            onClick={() => signOut(auth)}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => signInWithPopup(auth, googleProvider)}
      className="rounded-full bg-emerald-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-emerald-700"
    >
      Sign in with Google
    </button>
  );
}

function MessageBubble({ message, isOwn }) {
  const createdAt =
    message.createdAt?.toDate?.().toLocaleTimeString?.([], {
      hour: "2-digit",
      minute: "2-digit",
    }) || "—";

  return (
    <div
      className={[
        "flex gap-3",
        isOwn ? "justify-end text-right" : "justify-start text-left",
      ].join(" ")}
    >
      {!isOwn && message.photoURL ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={message.photoURL}
          alt={message.name || "User"}
          className="h-8 w-8 rounded-full border border-slate-200"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-semibold">
          {(message.name || "?").slice(0, 1)}
        </div>
      )}
      <div
        className={[
          "max-w-[75%] rounded-2xl px-3 py-2 shadow-sm",
          isOwn
            ? "bg-emerald-600 text-white rounded-br-sm"
            : "bg-white border border-slate-200 rounded-bl-sm",
        ].join(" ")}
      >
        <div className="text-xs text-slate-500 mb-1 flex items-center justify-between gap-2">
          <span className="font-semibold text-slate-700">
            {message.name || "Anonymous"}
          </span>
          <span>{createdAt}</span>
        </div>
        <p className="text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}
