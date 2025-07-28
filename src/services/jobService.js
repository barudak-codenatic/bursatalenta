const prisma = require('../utils/db');

const createJob = async (data) => {
  return await prisma.job.create({ data });
};

const getAllJobs = async () => {
  return await prisma.job.findMany({
    include: {
      approver: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

const getJobById = async (id) => {
  return await prisma.job.findUnique({
    where: { id: Number(id) },
    include: {
      approver: {
        select: { id: true, name: true },
      },
    },
  });
};

const updateJob = async (id, data) => {
  return await prisma.job.update({
    where: { id: Number(id) },
    data,
  });
};

const deleteJob = async (id) => {
  return await prisma.job.delete({
    where: { id: Number(id) },
  });
};

const approveJob = async (jobId, approverId) => {
  return await prisma.job.update({
    where: { id: Number(jobId) },
    data: {
      is_approved: true,
      approved_by: approverId,
    },
  });
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    approveJob,
}
