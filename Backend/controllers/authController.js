// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// (Register)
exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "ಬಳಕೆದಾರ ನೋಂದಾಯಿಸಲಾಗಿದೆ!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// (Login)
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("ಬಳಕೆದಾರ ಕಂಡುಬಂದಿಲ್ಲ!");

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json("ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ!");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json(error);
    }
};