// Dependencies
var express = require("express");
var path = require("path");

// Server
var app = express();
var PORT = process.env.PORT || 3000;

// Express to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes





// Start Server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
})