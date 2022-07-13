const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const PORT = 4000;

const ALPHABET_STOCK =
  "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GOOGL&interval=15min&apikey=2OXMJ46CH6F72DY0";
const IBM_STOCK =
  "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=15min&apikey=2OXMJ46CH6F72DY0";
const APPLE_STOCK =
  "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=15min&apikey=2OXMJ46CH6F72DY0";

const { default: axios } = require("axios");

app.use(cors());
app.use(bodyParser.json());

router.get("/company", async (req, res, next) => {
  try {
    const {symbol} = req.query;
    if (!symbol) {
      res.send("Please include tableName query parameter.");
      return;
    }

    let preferredStock = ALPHABET_STOCK;
    if (symbol.toLowerCase() === "ibm") {
      preferredStock = IBM_STOCK;
    } else if (symbol.toLowerCase() === "apple") {
      preferredStock = APPLE_STOCK;
    }

    const { data } = await axios.get(preferredStock);
    res.send(data);
  } catch (err) {
    console.log("Error:", err);
    next(err);
  }
});

app.use("/stocks", router);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
