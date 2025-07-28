const applicantService = require('../services/applicantService');

const create = async (req, res) => {
  try {
    const applicant = await applicantService.createApplicant(req.body);
    res.status(201).json(applicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create applicant' });
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
  update,
  remove,
};
