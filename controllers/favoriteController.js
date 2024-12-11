const {
  addFavoriteCourse,
  removeFavoriteCourse,
  getFavoriteCourses,
  checkFavoriteCourse,
} = require("../models/favoriteModel");

const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseData = req.body;

    const isFavorited = await checkFavoriteCourse(userId, courseData.title);

    if (isFavorited) {
      await removeFavoriteCourse(userId, courseData.title);
      res.json({ message: "Course removed from favorites" });
    } else {
      await addFavoriteCourse(userId, {
        title: courseData.title,
        short_intro: courseData.short_intro,
        url: courseData.url,
        predicted_category: courseData.predicted_category,
      });
      res.json({ message: "Course added to favorites" });
    }
  } catch (err) {
    console.error("Toggle favorite error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await getFavoriteCourses(userId);
    res.json(favorites);
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  toggleFavorite,
  getFavorites,
};
