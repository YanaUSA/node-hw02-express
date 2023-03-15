const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();

    res.json({
      status: "success",
      code: 200,
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactById = await getContactById(contactId);
    if (contactById) {
      res.json({
        status: "success",
        code: 200,
        contactById,
      });
    } else {
      res.json({
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    // if (body) {
    const { id, name, email, phone } = await addContact(body);
    res.json({
      status: "created",
      code: 201,
      data: {
        id,
        name,
        email,
        phone,
      },
    });
    // } else {
    //   res.json({
    //     status: "bad request",
    //     code: 400,
    //     message: "missing required name field",
    //   });
    // }
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactRemovedById = await removeContact(contactId);

  console.log("contactRemovedById", contactRemovedById);

  if (contactRemovedById) {
    res.json({
      code: 200,
      message: "contact deleted",
    });
  } else {
    res.json({
      code: 404,
      message: "Not found",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  const contactUpdated = await updateContact(contactId, body);

  if (contactUpdated) {
    res.json({
      status: "success",
      code: 200,
      data: contactUpdated,
    });
  } else {
    res.json({
      code: 404,
      message: "Not found",
    });
  }

  // res.json({ message: "template message" });
});

module.exports = router;
