const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get("/", jobController.handleGetJobs);
router.get("/admin/all", jobController.handleGetJobsForAdmin);
router.get("/admin/approval", jobController.handleGetJobsForApproval);
router.get("/:id", jobController.handleGetJob);
router.post("/", jobController.handleCreateJob);
router.post("/request", jobController.upload.single('image'), jobController.handleCreateJobRequest); // Route khusus untuk contact-sales dengan upload
router.put("/:id", jobController.upload.single('image'), jobController.handleUpdateJob);
router.delete("/:id", jobController.handleDeleteJob);
router.post("/:id/approve", jobController.handleApproveJob);
router.post("/:id/reject", jobController.handleRejectJob);

module.exports = router;