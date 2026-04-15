const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.post("/generate-stl", (req, res) => {
  const cad_code = req.body.cad_code;

  if (!cad_code) {
    return res.status(400).send("No CAD code provided");
  }

  fs.writeFileSync("model.scad", cad_code);

  exec("openscad -o output.stl model.scad", (err) => {
    if (err) {
      return res.status(500).send("OpenSCAD failed");
    }

    res.download("output.stl");
  });
});

const PORT = process.env.PORT || 5000; app.listen(PORT, () => console.log("Server running on", PORT));
