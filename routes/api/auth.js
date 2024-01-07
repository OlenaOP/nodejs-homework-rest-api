const express = require("express");
const ctrl = require("../../controllers/auth");

const router = express.Router();

// signup
router.post("/register", ctrl.register);

// signin
router.post("/login", ctrl.login);

module.exports = router;
