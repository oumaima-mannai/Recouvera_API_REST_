const express = require('express');
const { getStatistics } = require('../controllers/statisticsController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Obtenir les statistiques du tableau de bord
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Statistiques
 */
router.get('/', getStatistics);

module.exports = router;
