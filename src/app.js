const express = require('express');
const path = require('path');
// const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
// app.use('/api/users', userRoutes);

// Untuk akses halaman HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/register.html'));
});

module.exports = app;
