const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const getParsedPath = async (filePath) => {
  const readFile = await fs.readFile(filePath);
  return JSON.parse(readFile);
};

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactsDB = await getParsedPath(contactsPath);

    const idExists = contactsDB.find((el) => el.id === contactId);

    if (!idExists) {
      return res.status(404).json({ message: "Not found" });
    }

    next();
  } catch (error) {
    console.log(error.message);
  }
});

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
