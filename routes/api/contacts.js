const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const isValidId = require("../../middlewares/isValidId");

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

router.put("/:contactId", isValidId, ctrl.updateContact);

module.exports = router;
