const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// ✅ Allowed video MIME types
const allowedTypes = [
  'video/mp4',
  'video/x-m4v',
  'video/quicktime', // for .mov
  'video/mpeg',
  'video/webm',
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only video files (MP4, M4V, MOV, etc.) are allowed!'), false);
  }
};

module.exports = multer({ storage, fileFilter });
