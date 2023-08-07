const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { ctrlWrapper } = require('../../helpers');
const { User } = require('../../models/user');

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'avatars' }, // Путь для хранения на Cloudinary
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    const avatarURL = result.secure_url;

    await User.findByIdAndUpdate(_id, { avatarURL: avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    console.error('Произошла ошибка:', error);
    res.status(500).json({ error: 'Произошла ошибка при обновлении аватара.' });
  }
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
