const express = require('express');
const { createRecoveryAction, getRecoveryActions } = require('../controllers/recoveryActionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.post('/', createRecoveryAction);
router.get('/', getRecoveryActions);

module.exports = router;
