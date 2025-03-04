const express = require("express");
const router = express.Router();
const {createParcel, getAllParcels, updateParcel, getOneParcel, getUserParcel, deletePacel} = require("../controllers/parcel")

// ADD PARCEL
router.post("/",createParcel)

//GET ALL PARCELS

router.get("/", getAllParcels)


//UPDATE PARCEL
router.put("/:id", updateparcel)

//GET ONE PARCEL

router.get("/find/:id", getOneParcel)

//GET USERS PARCELS

router.post("/me", getUserParcel)

//DELETE PARCEL

router.delete("/:id", deleteParcel)

module.exports = router;