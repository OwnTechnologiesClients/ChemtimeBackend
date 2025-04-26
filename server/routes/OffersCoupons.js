const express = require("express");
const router = express.Router();
const { addOffer, getOffers, updateOffer } = require("../controller/OffersCoupons");

router.post("/addOffer", addOffer);
router.get("/getOffers", getOffers);
router.put("/updateOffer", updateOffer);

module.exports = router;