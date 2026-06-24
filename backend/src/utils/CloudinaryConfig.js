import { v2 as cloudinary } from 'cloudinary';

const uploadOnCloudinary = async (buffer,isBackgroundRemoval = false , isObjectRemoval = false , prompt="") => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const backgroundRemovedUrl = isBackgroundRemoval
      ? cloudinary.url(result.public_id, {
          effect: "background_removal",
          format: "png",
        })
      : null;

    if (isBackgroundRemoval && !backgroundRemovedUrl) {
      throw new Error("Failed to generate background removed url");
    }

    const objectRemovedUrl = isObjectRemoval ? cloudinary.url(result.public_id, {
        effect: `gen_remove:prompt_${prompt}`,
        format: 'jpg'
    }) : null;

    if (isObjectRemoval && !objectRemovedUrl) {
      throw new Error("Failed to generate object removed url");
    }

    return { success: true, originalImageUrl: result?.secure_url || null,backgroundRemovedUrl, objectRemovedUrl};
  } catch (error) {
    throw error;
  }
};

export default uploadOnCloudinary;
