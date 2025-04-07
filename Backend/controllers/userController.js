// controllers/userController.js
const User = require("../models/User");

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "ಬಳಕೆದಾರರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ!" });
    } catch (error) {
        res.status(500).json({ error: "ಸರ್ವರ್ ದೋಷ!" });
    }
};