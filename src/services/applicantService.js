const prisma = require('../utils/db');

const createApplicant = async (data) => {
  return await prisma.applicant.create({ data });
};

const getAllApplicants = async () => {
  return await prisma.applicant.findMany({
    include: {
      user: true,
      job: true,
    },
  });
};

const getApplicantById = async (id) => {
  return await prisma.applicant.findUnique({
    where: { id },
    include: {
      user: true,
      job: true,
    },
  });
};

const updateApplicant = async (id, data) => {
  return await prisma.applicant.update({
    where: { id },
    data,
  });
};

const deleteApplicant = async (id) => {
  return await prisma.applicant.delete({
    where: { id },
  });
};

module.exports = {
  createApplicant,
  getAllApplicants,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
};