import { v2 as cloudinary } from "cloudinary";

const DATA_FOLDER = "social-app";
const POSTS_ID = `${DATA_FOLDER}/posts.json`;
const PROFILE_ID = `${DATA_FOLDER}/profile.json`;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || "react_unsigned";

cloudinary.config({
  secure: true,
});

async function loadJson(publicId, fallback) {
  try {
    const resource = await cloudinary.api.resource(publicId, {
      resource_type: "raw",
    });
    if (!resource?.secure_url) return fallback;
    const response = await fetch(resource.secure_url, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to download ${publicId}`);
    return await response.json();
  } catch (error) {
    if (error?.http_code === 404) return fallback;
    console.error(`Error loading ${publicId}`, error);
    return fallback;
  }
}

async function saveJson(publicId, payload) {
  const encoded = Buffer.from(JSON.stringify(payload, null, 2)).toString(
    "base64"
  );
  await cloudinary.uploader.upload(
    `data:application/json;base64,${encoded}`,
    {
      resource_type: "raw",
      public_id: publicId,
      overwrite: true,
    }
  );
  return payload;
}

export async function uploadImage(dataUri, folder) {
  if (!dataUri) return { url: "", publicId: "" };
  const upload = await cloudinary.uploader.upload(dataUri, {
    upload_preset: UPLOAD_PRESET,
    folder: `${DATA_FOLDER}/${folder}`,
    resource_type: "image",
  });
  return { url: upload.secure_url, publicId: upload.public_id };
}

export async function deleteAsset(publicId, resourceType = "image") {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
  } catch (error) {
    console.error(`Error deleting ${publicId}`, error);
  }
}

export async function getPosts() {
  const current = await loadJson(POSTS_ID, []);
  if (current.length) return current;
  // Fallback to legacy ID without extension if present
  return loadJson(`${DATA_FOLDER}/posts`, []);
}

export async function savePosts(posts) {
  return saveJson(POSTS_ID, posts);
}

export async function getProfile() {
  const current = await loadJson(PROFILE_ID, null);
  if (current) return current;
  return loadJson(`${DATA_FOLDER}/profile`, null);
}

export async function saveProfile(profile) {
  return saveJson(PROFILE_ID, profile);
}
