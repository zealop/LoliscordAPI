var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://loliscord.herokuapp.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("Server running on port %s", PORT);
});