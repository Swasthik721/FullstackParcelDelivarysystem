// routes/user.js
const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controllers/userController"); // ಇಲ್ಲಿ Import ಮಾಡಿ

router.delete("/:id", deleteUser); // deleteUser ಈಗ ಲಭ್ಯವಿದೆ

module.exports = router;