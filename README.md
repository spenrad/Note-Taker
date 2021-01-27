Note Taker
====

# Description
This project is a demonstration of using Express to create backend functionality for your webpage. The basic idea is a "Note Taker" that allows you to write, save and/or delete notes on to a page. A lot of code was initially provided, so building out the server was the main task here.

----

# Code
Since the project is a mainly a demonstartion of how Express functions, let's examine each section of the server.js file.

```
// Dependencies
var express = require("express");
var path = require("path");
var db = require("./db/db.json");
var fs = require("fs");
```
These are the our "dependencies" or what will be imported to make the everything function. Here it is clear we are using Express and some sort of database in the format of a .json file.

```
// Server
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static("public"));

// Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```
This block here initializes the server and allows it handle data parsing.

```
// Routes
//     /notes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
```
This method allows us to visit the notes.html page when an appropriate action is done. In this example it is clicking a button on the index page that routes to the /notes path.

```
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
```
Here, we are both posting and accessing the JSON information that is created by writing a note into the forms in the webpage. 

req.body represents the data that data being entered on to the page. It can also be seen the notes are being ascribed a unique id before they are pushed and written into the database.

```
// API Routes
//      delete notes
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
```
This block of code attempts to delete a note from the page and also from the database in which it was entered. This is possible because of the unique ID ascribed to each object. 

req.params represents the object information, and here the unique key-value pair in all our objects is the "id."

It can be seen that an entire new array is being created and populated sans the particular ID that has been selected when the user chooses to delete the specific note.

```
// index route
    // star routes should go last
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
```
The * here represents that any other path not specified above will take you to the index page. This should always be the last path specified in your server.

```
// Start Server
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
```

Finally, the server is started and a nice message is written to ensure that it is listening on the proper PORT.

# Installation
There is no installation required if one wishes to use this app as there is a delpoyed Heroku link.

However, if one wished to run this app on their localhost, they would simply need to clone down the repository, run an npm install and type "node server.js" into their terminal. Then navigate to the default browser and enter in localhost:3000. The localhost can be changed to any of the user's choosing but should correspond to the PORT in the server file.

----

# Project Link
[Deployed Heroku App](https://powerful-basin-39930.herokuapp.com/) <br>
[Project Repository](https://github.com/spenrad/Note-Taker) <br>

----

# Author
Spencer Christy<br>
[GitHub](https://github.com/spenrad)<br>
[LinkedIn](https://www.linkedin.com/in/spencer-christy-543b84b3/)<br>