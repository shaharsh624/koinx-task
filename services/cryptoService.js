const axios = require("axios");

const COINS = ["bitcoin", "matic-network", "ethereum"];
const API_URL = "https://api.coingecko.com/api/v3/simple/price";

async function fetchCryptoData() {
    try {
        const response = await axios.get(API_URL, {
            params: {
                ids: COINS.join(","),
                vs_currencies: "usd",
                include_market_cap: "true",
                include_24hr_change: "true",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        return null;
    }
}

module.exports = { fetchCryptoData };
