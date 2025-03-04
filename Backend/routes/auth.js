const express = require("express");
const router = express.Router();
const Cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();


//REGISTRATION

router.post("/register",registerUser);
   
//LOGIN
router.post("/login",loginUser);


module.exports = router;