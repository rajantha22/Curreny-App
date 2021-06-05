const { getDataFromApi } = require("../Axios/getData");
const joi = require("joi");

const validateSchema = joi.object({
  fromCurrency: joi
    .string()
    .custom(checkCurrency, "custom validation")
    .required(),
  toCurrency: joi.required(),
  amount: joi.number().positive().required(),
});

function checkCurrency(value, helper) {
  data = getDataFromApi().then((data) => {
    for (const currency in data.rates) {
      if (value.toString().toUpperCase() == currency.toString()) {
        return true;
      }
    }
    return helper.message("Invalid Currency Unit"); //this condition isnt working
  });
}

module.exports = {
  validateSchema,
};
