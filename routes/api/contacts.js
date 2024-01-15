const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  ctrl.updateStatusContact
);

router.put("/:contactId", authenticate, isValidId, ctrl.updateContact);

module.exports = router;
