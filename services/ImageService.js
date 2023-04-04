const multer = require("multer");
const fse = require("fs-extra");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Jimp = require("jimp");

class ImageService {
  static upload(name) {
    const multerStorage = multer.memoryStorage();

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

  static async save(file, ...pathSegments) {
    const filename = `${uuidv4()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);

    await fse.ensureDir(fullFilePath);

    await Jimp.read(file.buffer)
      .then((img) => {
        return img
          .resize(250, 250)
          .quality(60)
          .write(path.join(fullFilePath, filename));
      })
      .catch((err) => {
        console.error(err);
      });

    return path.join(...pathSegments, filename);
  }
}

module.exports = ImageService;
