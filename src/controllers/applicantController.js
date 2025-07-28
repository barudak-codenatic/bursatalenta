const applicantService = require('../services/applicantService');

const create = async (req, res) => {
  try {
    // Get the uploaded file path if file was uploaded
    const resumePath = req.file ? `/uploads/${req.file.filename}` : null;
    
    // Prepare applicant data
    const applicantData = {
      ...req.body,
      resume: resumePath, // Use file path instead of URL
      job_id: parseInt(req.body.job_id),
      user_id: parseInt(req.body.user_id),
      salary_expectation_min: parseInt(req.body.salary_expectation_min),
      salary_expectation_max: parseInt(req.body.salary_expectation_max)
    };
    
    console.log('Creating applicant with data:', applicantData);
    
    const applicant = await applicantService.createApplicant(applicantData);
    res.status(201).json({
      message: 'Lamaran berhasil dikirim',
      applicant: applicant
    });
  } catch (error) {
    console.error('Error creating applicant:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to create applicant' 
    });
  }
};

const getAll = async (req, res) => {
  try {
    const applicants = await applicantService.getAllApplicants();
    res.json(applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get applicants' });
  }
};

const getByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const applicants = await applicantService.getApplicantsByUserId(userId);
    res.json(applicants);
  } catch (error) {
    console.error('Error getting applicants by user ID:', error);
    res.status(500).json({ message: 'Failed to get user applicants' });
  }
};

const getById = async (req, res) => {
  try {
    const applicant = await applicantService.getApplicantById(Number(req.params.id));
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get applicant' });
  }
};

const update = async (req, res) => {
  try {
    const applicant = await applicantService.updateApplicant(Number(req.params.id), req.body);
    res.json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update applicant' });
  }
};

const remove = async (req, res) => {
  try {
    await applicantService.deleteApplicant(Number(req.params.id));
    res.json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete applicant' });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getByUserId,
  update,
  remove,
};
