// [1] PREPARE NEEDED MODULES
const fs = require("fs");
const express = require("express");
const renderMainPage = require("./modules/renderMainPage");
const renderProfile = require("./modules/renderProfile");
const url = require("url");

// [2] INITIALIZE SERVER CONSTANTS
const app = express();
const PORT = 8080;

// [3] READ FILES & TEMPLATES
const indexHTML = fs.readFileSync("./public/templates/index.html", "utf8");
const indexFeatured = fs.readFileSync(
  "./public/templates/index-featured.html",
  "utf8"
);
const indexSingers = fs.readFileSync(
  "./public/templates/index-singers.html",
  "utf8"
);
const singerProfile = fs.readFileSync(
  "./public/templates/singer-profile.html",
  "utf8"
);
let notFound = fs.readFileSync("./public/templates/not-found.html", "utf8");
let footer = fs.readFileSync("./public/templates/footer.html", "utf8");
notFound += footer.replace("{currentYear}", new Date().getFullYear());
let database = fs.readFileSync("./databases/singersArr.json", "utf8");
let databaseObj = JSON.parse(database);

// [4] SET UP THE SERVER
app.use(express.static("./public"));
app.listen(PORT, "127.0.0.1", () => {
  console.log(`server initialized at port ${PORT}...`);
});

// [5] START THE APPLICATION
app.get("/", (req, res) => {
  let output;
  const featuredSinger = databaseObj
    .filter((singer) => singer.featured)
    .map((singer) => renderMainPage(indexFeatured, singer))
    .join("\n");

  const singersData = databaseObj
    .filter((singer) => !singer.featured)
    .map((singer) => renderMainPage(indexSingers, singer))
    .join("\n");
  output = indexHTML.replace("{singersData}", singersData);
  output = output.replace("{featuredSinger}", featuredSinger);
  output += footer.replace("{currentYear}", new Date().getFullYear());

  res.status(200);
  res.send(output);
});

app.get("/singer", (req, res) => {
  const targetSinger = databaseObj.filter(
    (singer) => singer.singerName.toLowerCase() === req.query.name
  );
  let output = targetSinger
    .map((singer) => renderProfile(singerProfile, singer))
    .join("\n");

  if (!output) {
    res.status(404).send(notFound);
  } else {
    output += footer.replace("{currentYear}", new Date().getFullYear());
    res.status(200).send(output);
  }
});

app.get("*", (req, res) => {
  res.status(404).send(notFound);
});
