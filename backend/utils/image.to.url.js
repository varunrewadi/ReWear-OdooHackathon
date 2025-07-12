import cloudinary from '../config/cloudinary.js';

export const uploadImagesToCloudinary = async (images) => {
    const uploadedImageUrls = [];

    if (!images || images.length === 0) {
        return uploadedImageUrls;
    }

    for (const img of images) {
        try {
            // If already a URL, skip upload
            if (img.startsWith('http://') || img.startsWith('https://')) {
                uploadedImageUrls.push(img);
                continue;
            }

            // Upload to Cloudinary
            const uploadRes = await cloudinary.uploader.upload(img, {
                folder: 'items',
            });

            uploadedImageUrls.push(uploadRes.secure_url);
        } catch (error) {
            console.error(`❌ Failed to upload ${img}:`, error);
        }
    }

    return uploadedImageUrls;
};
