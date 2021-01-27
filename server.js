// Dependencies
var express = require("express");
var path = require("path");
var db = require("./db/db.json");
var fs = require("fs");

// Server
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static("public"));

// Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
//     /notes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API Routes
//     get notes
app.get("/api/notes", function (req, res) {
  return res.json(db);
});

    // post notes and creates unique id
app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  newNote.id = db.length;
        // console.log(newNote);
  db.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
    if (err) {
      throw err;
    }
    res.send(db);
  });
});

    // delete notes
app.delete("/api/notes/:id", function (req, res) {
  var id = req.params.id;
  var temp = [];

  for (var i = 0; i < db.length; i++) {
    if (db[i].id !== parseInt(id)) {
      temp.push(db[i]);
    }
  }
  db = temp;
  fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
    if (err) {
      throw err;
    } else (res.send());
  });
});

// index route
    // star routes should go last
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Start Server
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
