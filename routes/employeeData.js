const router = require("express").Router();
const sql = require("mssql");
const pool = require("../db");
require("dotenv").config();

router.get("/intranet", (req, res) => {
  const selectData = "select * from dbo.EmpDir_Images";
  try {
    const requestDB = new sql.Request(pool);
    pool
      .connect()
      .then(() => {
        requestDB.query(selectData, (err, data) => {
          if (err) {
            res.status(400).send(err);
          } else if (data.recordset.length <= 0) {
            res.status(404).send("Data not found!");
            return;
          } else {
            console.log("Green light on pulling data.");
          }
          res.status(200).send(data.recordset);
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
