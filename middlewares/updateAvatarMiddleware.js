const ImageService = require("../services/ImageService");

exports.updateAvatarMiddleware = ImageService.upload("avatarURL");

// saving files in diskStorage(locally) with multer.

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "tmp");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extension = file.mimetype.split("/")[1];

//     cb(null, `${req.user.id}-${uniqueSuffix}.${extension}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Please upload images only"), false);
//   }
// };

// const updateAvatarMiddleware = multer({
//   storage: storage,
//   fileFilter: multerFilter,
//   limits: {
//     fileSize: 3 * 1024 * 1024,
//   },
// }).single("avatar");

// module.exports = {
//   updateAvatarMiddleware,
// };
