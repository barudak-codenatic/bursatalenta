const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname))
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed. Only JPEG, PNG, and GIF files are permitted.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

router.post('/register', userController.register);
router.get('/:id', userController.getUser);
router.put('/:id', upload.single('photo'), userController.updateUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/check-session", userController.checkSession);

module.exports = router;
