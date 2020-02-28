var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000
app.get("/url", (req, res, next) => {
  res.send("testtttttttt");
});

app.listen(PORT, () => {
  console.log("Server running on port %s", PORT);
});