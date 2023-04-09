const fsPromises = require("fs/promises");
const path = require("path");

const emptyFolder = async (folderPath) => {
  try {
    const files = await fsPromises.readdir(folderPath);
    for (const file of files) {
      await fsPromises.unlink(path.resolve(folderPath, file));

    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { emptyFolder };
