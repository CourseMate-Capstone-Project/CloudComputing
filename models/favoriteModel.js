const db = require("../config/db");

const addFavoriteCourse = async (userId, courseData) => {
  const query = `
    INSERT INTO favorite_courses 
    (user_id, title, short_intro, url, predicted_category)
    VALUES (?, ?, ?, ?, ?)
  `;

  await db.query(query, [
    userId,
    courseData.title,
    courseData.short_intro,
    courseData.url,
    courseData.predicted_category,
  ]);
};

const removeFavoriteCourse = async (userId, title) => {
  await db.query(
    "DELETE FROM favorite_courses WHERE user_id = ? AND title = ?",
    [userId, title]
  );
};

const getFavoriteCourses = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM favorite_courses WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

const checkFavoriteCourse = async (userId, title) => {
  const [rows] = await db.query(
    "SELECT * FROM favorite_courses WHERE user_id = ? AND title = ?",
    [userId, title]
  );
  return rows.length > 0;
};

module.exports = {
  addFavoriteCourse,
  removeFavoriteCourse,
  getFavoriteCourses,
  checkFavoriteCourse,
};
