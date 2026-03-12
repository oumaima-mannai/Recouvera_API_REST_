const express = require('express');
const { getStatistics } = require('../controllers/statisticsController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getStatistics);

module.exports = router;
