const express = require("express");
const router = express.Router();
const { Contact, schemas } = require("../../models/contact");

const isValidId = require("../../middlewares/isValidId");

// const contacts = require("../../controllers/contacts");

const { HttpError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (err) {
    next(err);
    // res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId); // Contact.findOne({ _id: contactId });
    if (!result) {
      throw HttpError(404, "Not found");
      // return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (err) {
    next(err);
    // res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
});

router.patch("/:contactId/favorite", isValidId, async (req, res, next) => {
  try {
    // const { error } = schemas.updateFavoriteSchema.validate(req.body);
    // if (error) {
    //   throw HttpError(400, error.message);
    // }
    console.log("beginning update");
    const { contactId } = req.params;
    console.log(contactId);
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", isValidId, async (req, res, next) => {
  try {
    console.log("beginning putting");
    const { error } = schemas.addSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
