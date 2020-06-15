import multer from "multer";
import path from "path";

const uploader = multer({
  dest: `${process.env.PWD}/uploads`,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  },
  fileFilter: function (req, file, cb) {
    var filetypes = /csv/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the following filetypes - " + filetypes
    );
  },
});

export default uploader;
