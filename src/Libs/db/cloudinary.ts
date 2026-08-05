import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a single file to Cloudinary with an optional custom public_id name.
 */
export async function uploadImage(
  file: File | null | undefined,
  folder = "stridestyle",
  name?: string,
): Promise<string | undefined> {
  if (!file || !(file instanceof File) || file.size === 0) {
    return undefined;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

  const cleanName = name
    ?.trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const result = await cloudinary.uploader.upload(base64Image, {
    folder,
    resource_type: "auto",
    public_id: cleanName ? `${cleanName}-${Date.now()}` : undefined,
    unique_filename: cleanName ? false : true,
  });

  return result.secure_url;
}

export default cloudinary;
