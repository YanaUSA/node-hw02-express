const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { mongoose, Types } = require("mongoose");
const Contact = require("./models/contactsModel");

dotenv.config({ path: "./.env" });

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// mongoose.connect(process.env.MONGO_URL);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connection successful");
}

main().catch((err) => {
  console.log(err);

  process.exit(1);
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const idIsValid = Types.ObjectId.isValid(id);

    if (!idIsValid) {
      return res.status(404).json({ message: "Not found" });
    }

    // const idExists = await Contact.findById(id);

    const idExists = await Contact.exists({ _id: id });

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
