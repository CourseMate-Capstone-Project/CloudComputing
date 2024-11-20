const path = require("path");
const {
  updateProfile,
  getUserProfile,
  findUserByUsername,
} = require("../models/userModel");
const bucket = require("../config/gcs");
const { format } = require("util");
const Multer = require("multer");

// Konfigurasi multer dengan validasi file
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limit 5MB
  },
  fileFilter: (req, file, cb) => {
    // Check file type
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
    // Validasi username
    if (!username || username.trim().length === 0) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Cek apakah username baru sudah digunakan (kecuali oleh user yang sama)
    const existingUser = await findUserByUsername(username);
    if (existingUser && existingUser.id !== req.user.id) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Dapatkan profile saat ini untuk referensi
    const currentProfile = await getUserProfile(req.user.id);
    let profilePictureUrl = currentProfile.profile_picture; // Gunakan URL yang ada jika tidak ada file baru

    // Handle file upload jika ada
    if (req.file) {
      try {
        const filename = `profile-pictures/${
          req.user.id
        }-${Date.now()}${path.extname(req.file.originalname)}`;
        const file = bucket.file(filename);

        // Create write stream dengan setting yang sesuai
        const blobStream = file.createWriteStream({
          resumable: false,
          metadata: {
            contentType: req.file.mimetype,
          },
          public: true, // Make file publicly accessible
        });

        // Handle error pada stream
        blobStream.on("error", (err) => {
          console.error("Upload stream error:", err);
          return res.status(500).json({ error: "Failed to upload file" });
        });

        // Handle selesainya upload
        await new Promise((resolve, reject) => {
          blobStream.on("finish", async () => {
            try {
              // Make file public
              await file.makePublic();

              // Get public URL
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

        // Jika ada foto profile lama, hapus dari storage
        if (currentProfile.profile_picture) {
          try {
            const oldFileName = currentProfile.profile_picture.split("/").pop();
            const oldFile = bucket.file(`profile-pictures/${oldFileName}`);
            await oldFile.delete().catch(() => {}); // Ignore error if file doesn't exist
          } catch (error) {
            console.error("Error deleting old profile picture:", error);
            // Continue execution even if deletion fails
          }
        }
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return res
          .status(500)
          .json({ error: "Failed to upload profile picture" });
      }
    }

    // Update profile di database
    await updateProfile(req.user.id, username, profilePictureUrl);

    // Ambil dan kirim data profile yang sudah diupdate
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