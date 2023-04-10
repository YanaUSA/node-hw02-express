const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
// const sendEmailFn = require("./services/mailService");

dotenv.config({ path: "./.env" });

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "ciwebip612@duiter.com", // Change to your recipient
  from: "everesty@meta.ua", // Change to your verified sender
  subject: "Test email",
  text: "please verify your email",
  html: "<strong>Test email from localhost:3000</strong>",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

const contactsRouter = require("./routes/api/contactsRoutes");
const usersRouter = require("./routes/api/usersRoutes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

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

app.use("/api/users", usersRouter);

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
