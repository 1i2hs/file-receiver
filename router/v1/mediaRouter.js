const express = require("express");

function init(multer, logger) {
  const VIDEO_FILE_NAME_PREFIX = process.env.VIDEO_FILE_NAME_PREFIX || "video";

  const mediaRouter = express.Router();
  mediaRouter.post(
    "/video",
    multer.single(VIDEO_FILE_NAME_PREFIX),
    (req, res) => {
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
    }
  );

  logger.info("mediaRouter initialization completed");

  return mediaRouter;
}

module.exports = (multer, logger) => init(multer, logger);
