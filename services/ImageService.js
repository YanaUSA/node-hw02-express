const multer = require("multer");
const fse = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");
const { emptyFolder } = require("../utils/deleteAvatar");

const fs = require("fs");

class ImageService {
  static upload(name) {
    const multerStorage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "tmp");
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4();
        const extension = file.mimetype.split("/")[1];

        cb(null, `${req.user.id}-${uniqueSuffix}.${extension}`);
      },
    });

    const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith("image")) {
        cb(null, true);
      } else {
        cb(new Error("Please upload images only"), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
      limits: {
        fileSize: 3 * 1024 * 1024,
      },
    }).single(name);
  }

  static async save(file, width, height, ...pathSegments) {
    const imgWidth = width || 250;
    const imgHeight = height || 250;

    const oldFilePath = path.resolve(file.path);

    const newFilePath = path.join(process.cwd(), "public", ...pathSegments);

    // fse.ensureDir builds path to save file
    await fse.ensureDir(newFilePath);

    await Jimp.read(oldFilePath)
      .then((img) => {
        return img
          .resize(imgWidth, imgHeight)
          .quality(60)
          .write(path.join(newFilePath, file.filename));
      })
      .catch((err) => {
        console.error(err);
      });

    const tmpPath = path.resolve("./tmp");

    emptyFolder(tmpPath);

    return path.join(...pathSegments, file.filename);
  }
}

module.exports = ImageService;
