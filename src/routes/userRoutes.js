const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/me", userController.checkSession);

module.exports = router;
