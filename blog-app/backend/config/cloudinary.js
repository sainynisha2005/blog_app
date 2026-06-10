const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmddos0fu",
  api_key: "116522169646195",
  api_secret: "9uf30-DSIWgPxplFcw8gl3ZIuOE"
});

module.exports = cloudinary;