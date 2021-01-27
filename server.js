// Dependencies
var express = require("express");
var path = require("path");

// Server
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static('public'));

// Express to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes
    // /notes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

    // index
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API Routes
    // get notes
// app.get("/api/notes", function(req, res) {
    
// });

//     // post notes
// app.post("/api/notes", function(req, res) {
    
// });

// app.delete("/api/notes/:id", function (req, res) {

// });



// Start Server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})

