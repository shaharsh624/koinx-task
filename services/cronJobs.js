const cron = require("node-cron");
const { fetchCryptoData } = require("./cryptoService");
const CryptoModel = require("../models/CryptoModel");

function scheduleCryptoDataFetch() {
    cron.schedule("0 */2 * * *", async () => {
        const data = await fetchCryptoData();
        if (data) {
            Object.keys(data).forEach(async (coin) => {
                const { usd, usd_market_cap, usd_24h_change } = data[coin];
                const newRecord = new CryptoModel({
                    coin,
                    price: usd,
                    marketCap: usd_market_cap,
                    change24h: usd_24h_change,
                    timestamp: new Date(),
                });
                await newRecord.save();
            });
            console.log("Crypto data saved successfully!");
        }
    });
}

module.exports = { scheduleCryptoDataFetch };
