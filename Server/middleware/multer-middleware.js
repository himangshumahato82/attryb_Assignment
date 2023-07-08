const multer = require("multer");
// storage || file location where file store and what is name of file
const fileLocation = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `userProfile-${Date.now()}-${file.originalname}`);
  },
});

const filter_file = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only Image allowed"));
  }
};
const upload = multer({
  storage: fileLocation,
  fileFilter: filter_file,
});

module.exports = upload;
