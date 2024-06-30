const q = console.log;

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
//express app
const app = express();

/////////////////connect to mongodb!//////////////////
const dbURL =
  "mongodb+srv://readonly:readonly@cluster0.xyrls2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(dbURL)
  .then(() => {
    q("connected");
  })
  .catch((err) => {
    q(err);
  });
// mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

//register view engine
app.set("view engine", "ejs");
//if different views folder
// app.set("views", "folder...");

//listen for requests
app.listen(3000);

/////////////////middleWare//////////////////
// app.use((req, res, next) => {
//   q("new request made:");
//   q("host:", req.hostname);
//   q("path:", req.path);
//   q("method:", req.method);
//   next();
// });

//////////////thirdParty middleWare///////////////

// app.use(morgan("dev"));
// app.use(morgan("tiny"));

///////////////middleWare & static files///////////

app.use(express.static("public"));

/////////////////////////////////////////////

app.get("/", (req, res) => {
  const blogs = [
    { title: `payam 2 3`, snippet: `lorem 2 3 lorem 2 3 lorem 2 3 lorem 2 3` },
    { title: `1 ahmad 3`, snippet: `1 lorem 3 1 lorem 3 1 lorem 3 1 lorem 3` },
    { title: `1 2 doctor`, snippet: `1 2 lorem 1 2 lorem 1 2 lorem 1 2 lorem` },
  ];
  // res.render("index");
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  // res.send("<p>about</p>");
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
