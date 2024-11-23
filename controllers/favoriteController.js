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

    const isFavorited = await checkFavoriteCourse(
      userId,
      courseData.id.toString()
    );

    if (isFavorited) {
      await removeFavoriteCourse(userId, courseData.id.toString());
      res.json({ message: "Course removed from favorites" });
    } else {
      await addFavoriteCourse(userId, courseData);
      res.json({ message: "Course added to favorites" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await getFavoriteCourses(userId);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  toggleFavorite,
  getFavorites,
};
