const express = require('express');
const router = express.Router();
const multer = require('../middleware/uploadMiddleware');
const videoController = require('../controllers/videoController');

// Upload video file
router.post('/upload', multer.single('video'), videoController.uploadVideo);

// Get video metadata and content
router.get('/:id', videoController.getVideoById);

module.exports = router;
