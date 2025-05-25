const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const Video = require('../models/Video');
const Transcript = require('../models/Transcript'); 
exports.uploadVideo = async (req, res) => {
    try {
      const videoPath = req.file.path;
  
      const newVideo = new Video({
        filename: req.file.filename,
        path: videoPath,
        originalname: req.file.originalname,
      });
      const savedVideo = await newVideo.save();
  
      // 🔥 Transcribe using ai-service
      const FormData = require('form-data');
      const formData = new FormData();
      formData.append('file', fs.createReadStream(videoPath));
  
      const transcribeRes = await axios.post('http://localhost:8000/transcribe', formData, {
        headers: formData.getHeaders(),
      });
      

      const transcriptText = transcribeRes.data.full_transcript;

      console.log(transcriptText);
  
      // 🔥 Split transcript into segments
      const segments = splitTranscriptIntoSegments(transcriptText);
  
      // 🔥 For each segment, generate MCQs
      const segmentEntries = [];
      for (const segmentText of segments) {
        const mcqRes = await axios.post('http://localhost:8000/generate_mcqs', {
          text: segmentText,
        });
  
        segmentEntries.push({
          startTime: '', // Optional if you're not using timestamps
          endTime: '',
          text: segmentText,
          questions: mcqRes.data.mcqs,
        });
      }
  
      // 🔥 Save to MongoDB
      const transcript = new Transcript({
        videoId: savedVideo._id,
        segments: segmentEntries,
      });
  
      await transcript.save();
  
      res.status(200).json({ message: 'Video uploaded and processed', videoId: savedVideo._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to process video' });
    }
  };
  
  function splitTranscriptIntoSegments(text, maxWords = 500) {
    const words = text.split(/\s+/);
    const segments = [];
    for (let i = 0; i < words.length; i += maxWords) {
      segments.push(words.slice(i, i + maxWords).join(' '));
    }
    return segments;
  }

  exports.getVideoById = async (req, res) => {
    try {
      const videoId = req.params.id;
      console.log(videoId);
      const transcript = await Transcript.findOne({ videoId });
      if (!transcript) {
        return res.status(404).json({ message: 'Transcript not found for this video' });
      }
      console.log(transcript);
      res.json(transcript);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  