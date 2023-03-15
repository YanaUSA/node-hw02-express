const express = require("express");
const Joi = require("joi");
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
    res.json({
      status: "success",
      code: 200,
      contactById,
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required(),
      phone: Joi.string()
        .min(3)
        .max(15)
        .pattern(/^[0-9-()+ ]+$/)
        .required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.json({
        status: "bad request",
        code: 400,
        message: "missing required name field",
      });
    }

    const { id, name, email, phone } = await addContact(req.body);

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
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    await removeContact(contactId);

    res.json({
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const schema = Joi.object({
      name: Joi.string().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
      }),
      phone: Joi.string().min(3).max(15),
    }).min(1);

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.json({
        status: "bad request",
        code: 400,
        message: "missing field",
      });
    }

    const contactUpdated = await updateContact(contactId, req.body);

    if (contactUpdated) {
      res.json({
        status: "success",
        code: 200,
        data: contactUpdated,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
