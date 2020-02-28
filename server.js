var express = require("express");
var app = express();
var cors = require('cors');
var PORT = process.env.PORT || 8000;
app.use(cors());
app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("Server running on port %s", PORT);
});