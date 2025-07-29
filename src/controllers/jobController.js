const jobService = require('../services/jobService');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../public/uploads');
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'job-' + uniqueSuffix + extension);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  }
});

const handleCreateJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleCreateJobRequest = async (req, res) => {
  try {
    // Handle image upload if present
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    // Set default values untuk job request dari contact-sales
    const jobData = {
      company_name: req.body.company_name,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      salary: req.body.salary ? parseInt(req.body.salary) : 0,
      type: req.body.type,
      image: imagePath,
      is_approved: false, // Default pending approval
      is_opened: true     // Default terbuka
    };
    
    const job = await jobService.createJob(jobData);
    res.status(201).json({ 
      message: "Permintaan posting lowongan berhasil dikirim! Tim sales akan menghubungi Anda dalam 1-2 hari kerja.",
      id: job.id
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleGetJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleGetJob = async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleUpdateJob = async (req, res) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.body);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleDeleteJob = async (req, res) => {
  try {
    await jobService.deleteJob(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleApproveJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const approverId = req.session.userId; 
    if (!approverId) return res.status(401).json({ message: "Unauthorized" });

    const job = await jobService.approveJob(jobId, approverId);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleToggleJobStatus = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { is_opened } = req.body;
    
    const job = await jobService.toggleJobStatus(jobId, is_opened);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleGetJobsForAdmin = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobsForAdmin();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  handleCreateJob,
  handleCreateJobRequest,
  handleGetJobs,
  handleGetJobsForAdmin,
  handleGetJob,
  handleUpdateJob,
  handleDeleteJob,
  handleApproveJob,
  handleToggleJobStatus,
  upload
};