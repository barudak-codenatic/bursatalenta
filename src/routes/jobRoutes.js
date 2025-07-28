const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get("/", jobController.handleGetJobs);
router.get("/admin/all", jobController.handleGetJobsForAdmin);
router.get("/:id", jobController.handleGetJob);
router.post("/", jobController.handleCreateJob);
router.put("/:id", jobController.handleUpdateJob);
router.put("/:id/toggle-status", jobController.handleToggleJobStatus);
router.delete("/:id", jobController.handleDeleteJob);
router.post("/:id/approve", jobController.handleApproveJob);

module.exports = router;