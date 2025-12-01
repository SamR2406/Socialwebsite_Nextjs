# Socialwebsite_Nextjs

An educational social app built with Next.js. It lets you publish posts to a shared feed (stored in Cloudinary), browse a feed preview, and chat in real time using Firebase.

## Features
- Feed + Post creator with image uploads to Cloudinary.
- Chat room powered by Firebase Auth + Firestore.
- Responsive UI with a fixed navigation bar and Tailwind styling.
- Basic likes persistence in localStorage for the feed cards.

## Tech Stack
- Next.js 16 (App Router) + React 19
- Tailwind CSS
- Firebase (Auth, Firestore)
- Cloudinary (asset + JSON storage)

## Getting Started
Install dependencies:
```bash
npm install
```

Run the dev server:
```bash
npm run dev
```
Open http://localhost:3000.

Lint:
```bash
npm run lint
```

## Environment Variables
Create `.env.local` in the project root and add:
```bash
# Firebase (client-readable; secure rules still required)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Cloudinary (server-side only)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=unsigned_preset_for_client_uploads
```


## Educational Use
This project is for learning purposes. If you fork it, remember to create your own Firebase project and Cloudinary account, and apply proper security rules before going live.

