module.exports = function (req, res, next) {
  if (req.session && req.session.role === 'ADMIN') {
    next(); // izinkan akses
  } else {
    res.status(403).send('Akses ditolak. Anda bukan admin.');
  }
};
