const jobService = require('../services/jobService');

const handleCreateJob = async (req, res) => {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
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

module.exports = {
  handleCreateJob,
  handleGetJobs,
  handleGetJob,
  handleUpdateJob,
  handleDeleteJob,
  handleApproveJob
};