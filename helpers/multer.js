const multer = require('multer');

// SAVE FILE TO SERVER STORAGE
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/employee');
    },
    filename: (req, file, cb) => {
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

//MULTER CONFIGURATION
var upload = multer({storage: storage});

module.exports = upload;