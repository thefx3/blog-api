require('dotenv').config();
console.log("Environment loaded:", process.env.DB_HOST, process.env.DB_DATABASE);

const path = require("node:path");
const express = require('express');
const cors = require('cors');

// Import local modules
const authRoute = require("./routes/authRoute")

// Initialize express app
const app = express();

//-------------- MIDDLEWARES --------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", authRoute);


// -------------- SERVER --------------------------------
const PORT = process.env.PORT || 8080;
(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`✅ App listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database initialization failed:", err);
  }
})();


app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});