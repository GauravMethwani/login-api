const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/auth"); // Destructure the alldetails function
const { getUsers } = require("../controllers/auth");
const { loginUser } = require("../controllers/auth");

router.route("/create").post(createUser);
router.route("/get").get(getUsers);
router.route("/login").post(loginUser);
module.exports = router;
