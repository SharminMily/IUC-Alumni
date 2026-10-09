import { v2 as cloudinary } from 'cloudinary';
import config from '../config';


cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// short path - full URL
export const getCloudinaryUrl = (publicId: string) => {
  if (!publicId) return '';
  // already full url hole all return
  if (publicId.startsWith('http')) return publicId;

  return cloudinary.url(publicId, {
    secure: true,
  });
};

export default cloudinary;