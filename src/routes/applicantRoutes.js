const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const applicantController = require('../controllers/applicantController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'cv-' + uniqueSuffix + path.extname(file.originalname))
  }
});

// File filter to only allow certain file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed. Only PDF, DOC, and DOCX files are permitted.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

router.post('/', upload.single('cv_file'), applicantController.create);
router.get('/', applicantController.getAll);
router.get('/user/:userId', applicantController.getByUserId);
router.get('/job/:jobId', applicantController.getByJobId);
router.get('/:id', applicantController.getById);
router.put('/:id', applicantController.update);
router.delete('/:id', applicantController.remove);

module.exports = router;
