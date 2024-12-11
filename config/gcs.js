const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

module.exports = bucket;
