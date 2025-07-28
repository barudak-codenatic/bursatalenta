const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');

router.post('/', applicantController.create);
router.get('/', applicantController.getAll);
router.get('/:id', applicantController.getById);
router.put('/:id', applicantController.update);
router.delete('/:id', applicantController.remove);

module.exports = router;
