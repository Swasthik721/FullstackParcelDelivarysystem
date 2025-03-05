const express = require("express");
const router = express.Router();
const {createParcel, getAllParcels, updateParcel, getOneParcel, getUserParcel, deletePacel} = require("../controllers/parcel");
const {verifyToken, verifyAndAuthorization } = require("../middlewares/verifyToken");

// ADD PARCEL
router.post("/",verifyToken,createParcel)

//GET ALL PARCELS

router.get("/",verifyTokenAndAuthorization,getAllParcels)


//UPDATE PARCEL
router.put("/:id", updateparcel)

//GET ONE PARCEL

router.get("/find/:id", getOneParcel)

//GET USERS PARCELS

router.post("/me", getUserParcel)

//DELETE PARCEL

router.delete("/:id", deleteParcel)

module.exports = router;