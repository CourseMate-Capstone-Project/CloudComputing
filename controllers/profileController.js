const path = require("path");
const {
  updateProfile,
  getUserProfile,
  findUserByUsername,
} = require("../models/userModel");
const bucket = require("../config/gcs");
const { format } = require("util");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG and GIF are allowed."));
    }
  },
});

const getProfile = async (req, res) => {
  try {
    const profile = await getUserProfile(req.user.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { username } = req.body;

  try {
    if (!username || username.trim().length === 0) {
      return res.status(400).json({ message: "Username is required" });
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser && existingUser.id !== req.user.id) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const currentProfile = await getUserProfile(req.user.id);
    let profilePictureUrl = currentProfile.profile_picture;

    if (req.file) {
      try {
        const filename = `profile-pictures/${
          req.user.id
        }-${Date.now()}${path.extname(req.file.originalname)}`;
        const file = bucket.file(filename);

        const blobStream = file.createWriteStream({
          resumable: false,
          metadata: {
            contentType: req.file.mimetype,
          },
          public: true,
        });

        blobStream.on("error", (err) => {
          console.error("Upload stream error:", err);
          return res.status(500).json({ error: "Failed to upload file" });
        });

        await new Promise((resolve, reject) => {
          blobStream.on("finish", async () => {
            try {
              await file.makePublic();

              profilePictureUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${filename}`
              );
              resolve();
            } catch (err) {
              console.error("Error making file public:", err);
              reject(err);
            }
          });

          blobStream.on("error", reject);
          blobStream.end(req.file.buffer);
        });

        if (currentProfile.profile_picture) {
          try {
            const oldFileName = currentProfile.profile_picture.split("/").pop();
            const oldFile = bucket.file(`profile-pictures/${oldFileName}`);
            await oldFile.delete().catch(() => {});
          } catch (error) {
            console.error("Error deleting old profile picture:", error);
          }
        }
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return res
          .status(500)
          .json({ error: "Failed to upload profile picture" });
      }
    }

    await updateProfile(req.user.id, username, profilePictureUrl);

    const updatedProfile = await getUserProfile(req.user.id);
    res.json(updatedProfile);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  multer,
  getProfile,
  updateUserProfile,
};
