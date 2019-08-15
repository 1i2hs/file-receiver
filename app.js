const express = require("express");
const compression = require("compression");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compression());
app.use(cors());

const logger = require("./lib/logger");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media')
  },
  filename: function (req, file, cb) {
    const t1 = file.originalname.split(".");
    const ext = t1 && t1.length >= 2 ? t1[t1.length - 1] : "";
    const finalFilename = `${file.fieldname}-${Date.now()}.${ext}`;
    logger.info(`final file name is: ${finalFilename}`);

    cb(null, finalFilename);
  }
});

const upload = multer({ storage: storage });


const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "media-receiver";


/**ㄴ
 * error handling
 */
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send(err.stack);
});

process.on("uncaughtException", err => {
  logger.error(err.stack);
});

app.listen(PORT, () => logger.info(`${APP_NAME} listening at port ${PORT}`));


const mediaRouter = express.Router();
mediaRouter.post("/video", upload.single("jyouth-video"), (req, res) => {
  const { file } = req;
  if(file) {
    logger.info(`file: ${file.originalname} uploaded successfully.`);

  } else {
    logger.info(`file: ${file.originalname} is being uploaded...`);
  }

  res.sendStatus(200);
})

app.use("/upload", mediaRouter);

/**
 * path : /upload
 * subpath: /image
 * subpath: /video
 */