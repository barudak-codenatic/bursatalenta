const prisma = require('../utils/db');

const getDashboardStats = async (req, res) => {
  try {
    // Get job statistics
    const totalJobs = await prisma.job.count();
    const activeJobs = await prisma.job.count({
      where: {
        is_approved: true,
        is_opened: true
      }
    });
    const pendingJobs = await prisma.job.count({
      where: {
        is_approved: false
      }
    });
    const rejectedJobs = totalJobs - activeJobs - pendingJobs;

    // Get user statistics
    const totalUsers = await prisma.user.count();
    const jobSeekers = await prisma.user.count({
      where: {
        role: 'user'
      }
    });
    const companies = await prisma.user.count({
      where: {
        role: 'provider'
      }
    });
    const admins = await prisma.user.count({
      where: {
        role: 'admin'
      }
    });

    // Get application statistics
    const totalApplications = await prisma.applicant.count();
    const pendingApplications = await prisma.applicant.count({
      where: {
        status: 'pending'
      }
    });
    const acceptedApplications = await prisma.applicant.count({
      where: {
        status: 'accepted'
      }
    });
    const rejectedApplications = await prisma.applicant.count({
      where: {
        status: 'rejected'
      }
    });

    // Return all statistics
    res.json({
      jobs: {
        total: totalJobs,
        active: activeJobs,
        pending: pendingJobs,
        rejected: rejectedJobs
      },
      users: {
        total: totalUsers,
        jobSeekers: jobSeekers,
        companies: companies,
        admins: admins
      },
      applications: {
        total: totalApplications,
        pending: pendingApplications,
        accepted: acceptedApplications,
        rejected: rejectedApplications
      }
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ message: 'Failed to get dashboard statistics' });
  }
};

module.exports = {
  getDashboardStats
};