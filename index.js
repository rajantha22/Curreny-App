const express = require("express");
const dataProcess = require("./Controller/dataProcess");
const { validateSchema } = require("./Validation/validation_schema");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  //get API details
  res.json({
    Assignmet: "Currency Converter",
    Author: "Rajantha Obeysekara",
    Email: "2015s15221@stu.cmb.ac.lk",
    Mobile: "0766774316",
  });
});

app.post("/convert", async (req, res, next) => {
  try {
    await validateSchema.validateAsync(req.body);
  } catch (error) {
    res.status(400).json(error.details[0].message);
  }
  try {
    const data = await dataProcess.processData(req.body);

    if (data.valueOf() > 0) {
      res.json({ amount: data, currency: req.body.toCurrency });
    } else {
      console.log(new Error("Invalid Currency Unit"));
      res.json({ error: "Invalid Currency Unit" });
    }
  } catch (error) {
    console.log(new Error(error.message));
    res.status(500).json({ error: error.message });
  }
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application has been started on port ${port}`);
});
