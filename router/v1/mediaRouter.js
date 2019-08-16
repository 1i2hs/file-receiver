const express = require("express");
const multer = require("multer");

function init(logger) {
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./media");
    },
    filename: function(req, file, cb) {
      const t1 = file.originalname.split(".");
      const ext = t1 && t1.length >= 2 ? t1[t1.length - 1] : "";
      const finalFilename = `${file.fieldname}-${Date.now()}.${ext}`;
      logger.info(`final file name is: ${finalFilename}`);

      cb(null, finalFilename);
    }
  });

  const upload = multer({ storage: storage });

  const VIDEO_FILE_NAME_PREFIX = process.env.VIDEO_FILE_NAME_PREFIX || "video";

  const mediaRouter = express.Router();
  mediaRouter.post("/video", upload.single(VIDEO_FILE_NAME_PREFIX), (req, res) => {
    const { file } = req;
    logger.info(
      `file: ${file.originalname} received successfully in the path: ${
        file.path
      }.`
    );

    res.send({
      acknowledge: true,
      uploaded: true
    });
  });

  logger.info("mediaRouter initialization completed");

  return mediaRouter;
}

module.exports = logger => init(logger);
