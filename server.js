const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const potrace = require("potrace");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

app.post("/convert", upload.single("image"), (req, res) => {

    const input = req.file.path;
    const clean = input + "-clean.png";

    sharp(input)
        .resize(1000)
        .png()
        .toFile(clean)
        .then(() => {

            potrace.trace(clean, (err, svg) => {
                if (err) return res.send("error");

                res.setHeader("Content-Type", "image/svg+xml");
                res.send(svg);

                fs.unlinkSync(input);
                fs.unlinkSync(clean);
            });

        });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server draait op port " + PORT);
});
