const axios = require("axios").default;
const NodeCache = require("node-cache");
const cacheMem = new NodeCache({ stdTTL: 5, checkperiod: 120 });

API_KEY = process.env.API_KEY; //API KEY
BASE_URL = "http://data.fixer.io/api";
DATA_URL = "latest";

const cache_time = 24 * 60 * 60; //valid time period

async function getDataFromApi() {
  const cacheData = cacheMem.get("ratesData");

  if (cacheData == undefined) {
    const url = `${BASE_URL}/${DATA_URL}?access_key=${process.env.API_KEY}`;
    const response = await axios.get(url).catch((error) => {
      throw new Error(error);
    });
    if (response.data.success == true) {
      cacheMem.set("ratesData", response.data, cache_time);
      return response.data;
    }
    if (response.data.success == false) {
      throw new Error(response.data.error.type);
    }
  } else {
    return cacheData;
  }
}

module.exports = { getDataFromApi };
