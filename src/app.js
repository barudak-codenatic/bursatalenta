const express = require('express');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "rahasia_login_sesi",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, 
  })
);
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applicants', applicantRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Untuk akses halaman HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/dashboard.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/auth/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/auth/register.html'));
});

app.get('/forgot-password', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/auth/forgot-password.html'));
});

app.get('/admin-register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/auth/provider-register.html'));
});

// Rute dashboard telah dihapus karena tidak digunakan lagi

app.get('/admin/add-job', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/admin/add-job.html'));
});

app.get('/admin/edit-job', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/admin/edit-job.html'));
});

app.get('/admin/job-form', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/admin/edit-job.html'));
});

app.get('/admin/job-details', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/admin/job-detail.html'));
});

app.get('/admin/job-approval', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/admin/job-approval.html'));
});

app.get('/admin/job-management', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/admin/job-management.html'));
});

app.get('/job-detail', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/job-detail.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/profile.html'));
});

app.get('/my-applications', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/my-applications.html'));
});

app.get('/contact-sales', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/contact-sales.html'));
});

module.exports = app;
