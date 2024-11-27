const db = require("../config/db");

const addFavoriteCourse = async (userId, courseData) => {
  const query = `
    INSERT INTO favorite_courses 
    (user_id, course_id, course_title, course_url, category, sub_category)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  await db.query(query, [
    userId,
    courseData.id.toString(),
    courseData.title,
    courseData.url,
    courseData.category,
    courseData.subCategory,
  ]);
};

const removeFavoriteCourse = async (userId, courseId) => {
  await db.query(
    "DELETE FROM favorite_courses WHERE user_id = ? AND course_id = ?",
    [userId, courseId]
  );
};

const getFavoriteCourses = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM favorite_courses WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

const checkFavoriteCourse = async (userId, courseId) => {
  const [rows] = await db.query(
    "SELECT * FROM favorite_courses WHERE user_id = ? AND course_id = ?",
    [userId, courseId]
  );
  return rows.length > 0;
};

module.exports = {
  addFavoriteCourse,
  removeFavoriteCourse,
  getFavoriteCourses,
  checkFavoriteCourse,
};
