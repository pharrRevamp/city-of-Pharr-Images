const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const employeeData = require("./routes/employeeData");
// middleware
app.use(express.json());
app.use(cors());
app.use("/intranet-images", express.static("cityImages"));

app.use("/", employeeData);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5001;
}

app.get("/", (req, res) => {
  console.log("this is popping");
  res.send("Hello World! from City Images Server");
});

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
