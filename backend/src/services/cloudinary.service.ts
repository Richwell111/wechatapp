import cloudinary from "../lib/cloudinary";


export async function uploadToCloudinary(
  buffer: Buffer,
  mimetype: string
) {
  const base64 = buffer.toString("base64");
  const dataURL = `data:${mimetype};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataURL, {
    folder: "chat-app-tutorial",
    transformation: [{ format: "webp" }],
  });

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
}

export async function deleteFromCloudinary(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}