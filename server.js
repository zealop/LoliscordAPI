var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("Server running on port %s", PORT);
});