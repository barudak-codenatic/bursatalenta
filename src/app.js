const express = require('express');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicantRoutes = require('./routes/applicantRoutes');

const app = express();

app.use(express.json());
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

app.get('/provider-register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/auth/provider-register.html'));
});

app.get('/provider-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/provider/dashboard.html'));
});

app.get('/provider/add-job', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/provider/add-job.html'));
});

app.get('/provider/edit-job', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/provider/edit-job.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/view/dashboard.html'));
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

module.exports = app;
