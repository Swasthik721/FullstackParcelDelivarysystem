const express = require("express");
const router = express.Router()

//DELETING USER

router.delete("/:id",deleteUser)

//GETIALL USERS

Router.GET("/",getAllUsers)

module.exports = router;