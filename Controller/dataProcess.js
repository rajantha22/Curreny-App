const axios = require("axios").default;
const getData = require("../Axios/getData");

async function processData(data) {
  try {
    const ratesData = await getData.getDataFromApi();
    const rateFromC =
      ratesData.rates[data.fromCurrency.toString().toUpperCase()];
    const rateToC = ratesData.rates[data.toCurrency.toString().toUpperCase()];
    const amount = data.amount;
    if (ratesData != false) {
      return (rateToC / rateFromC) * amount;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { processData };
