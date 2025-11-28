"use client";

import React from "react";
import firebase from 'firebase/app';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Chat</h1>
        <p className="text-sm text-slate-600">
          Chat is coming soon. For now, share updates on the Post tab and view them on Home.
        </p>
      </div>
    </div>
  )
  
}
