const CryptoModel = require("../models/CryptoModel");
const { calculateStandardDeviation } = require("../utils/mathUtils");

async function getCryptoStats(req, res) {
    const { coin } = req.query;
    try {
        const latestRecord = await CryptoModel.findOne({ coin }).sort({
            timestamp: -1,
        });
        if (!latestRecord)
            return res.status(404).json({ message: "No data found" });

        res.json({
            price: latestRecord.price,
            marketCap: latestRecord.marketCap,
            "24hChange": latestRecord.change24h,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
}

async function getCryptoPriceDeviation(req, res) {
    const { coin } = req.query;
    try {
        const records = await CryptoModel.find({ coin })
            .sort({ timestamp: -1 })
            .limit(100);
        if (records.length < 2)
            return res
                .status(400)
                .json({ message: "Not enough data for deviation" });

        const prices = records.map((record) => record.price);
        const deviation = calculateStandardDeviation(prices);

        res.json({ deviation });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data" });
    }
}

module.exports = { getCryptoStats, getCryptoPriceDeviation };
