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

    const url = isBackgroundRemoval ? cloudinary.url(result.public_id, {
        effect: 'background_removal',
        format: 'png'  // PNG preserves transparency
    }) : result?.secure_url;

    if(!url){
        throw new Error("Failed to generate url");
    }

    const objectRemovedUrl = isObjectRemoval ? cloudinary.url(result.public_id, {
        effect: `gen_remove:prompt_${prompt}`,
        format: 'jpg'
    }) : result?.secure_url;

    return { success: true, originalImageUrl: result?.secure_url || null,url, objectRemovedUrl , publicId: result?.public_id , secureUrl: result?.secure_url };
  } catch (error) {
    throw error;
  }
};

export default uploadOnCloudinary;
