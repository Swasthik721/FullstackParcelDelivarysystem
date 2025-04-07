const express = require("express");
const router = express.Router();
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");
const user = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

// register

router.post("/register", async (req, res) => {
  const newUser = new user({
    fullname: req.body.fullname,
    email: req.body.email,
    age: req.body.age,
    country: req.body.country,
    address: req.body.address,
    password: cryptojs.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.status(401).json("You have not registered");
        }

        const hashedPassword = cryptojs.AES.decrypt(
            user.password,
            process.env.PASS
        )

        const originalPassword = hashedPassword.toString(cryptojs.enc.Utf8);

        if (originalPassword !== req.body.password) {

            return res.status(500).json("Wrong credentials");
        }

         const { password, ...info} = user._doc;

        const accessToken = jwt.sign(
            {id:user._id, role: user.role},
            process.env.JWT_SEC,
            {expiresIn: "10d"}
        )

        res.status(200).json({...info, accessToken});

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
