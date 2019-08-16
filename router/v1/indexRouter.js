const fs = require("fs");
const v1Router = require("express").Router();
const multer = require("multer");
const mediaRouter = require("./mediaRouter");

function init(logger) {
  const multerObj = initMulter();

  v1Router.use("/upload", mediaRouter(multerObj, logger));

  //add more routers
  logger.info("v1Router initialization completed");

  return v1Router;
}

function initMulter() {
  const fileDestination = process.env.FILE_UPLOAD_DESTINATION || "uploaded";

  if (!fs.existsSync(`./${fileDestination}`)) {
    fs.mkdirSync(`./${fileDestination}`);
  }

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, `./${fileDestination}`);
    },
    filename: function(req, file, cb) {
      const t1 = file.originalname.split(".");
      const ext = t1 && t1.length >= 2 ? t1[t1.length - 1] : "";
      const finalFilename = `${file.fieldname}-${Date.now()}.${ext}`;
      logger.info(`final file name is: ${finalFilename}`);

      cb(null, finalFilename);
    }
  });

  return multer({ storage: storage });
}

module.exports = logger => init(logger);
