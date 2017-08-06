const express = require("express");
const app =express();

app.get("/", (req, res) => {
  res.send("testing");
});


const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server is on.");
});