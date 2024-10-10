const express = require("express");
const {
    getCryptoStats,
    getCryptoPriceDeviation,
} = require("../controllers/cryptoController");
const router = express.Router();

router.get("/stats", getCryptoStats);
router.get("/deviation", getCryptoPriceDeviation);

module.exports = router;
