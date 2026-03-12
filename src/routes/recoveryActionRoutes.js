const express = require('express');
const { createRecoveryAction, getRecoveryActions } = require('../controllers/recoveryActionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/recovery-actions:
 *   get:
 *     summary: Obtenir toutes les actions de recouvrement
 *     tags: [Recovery Actions]
 *     responses:
 *       200:
 *         description: Liste des actions
 *   post:
 *     summary: Enregistrer une action de recouvrement
 *     tags: [Recovery Actions]
 *     responses:
 *       201:
 *         description: Action enregistrée
 */
router.post('/', createRecoveryAction);
router.get('/', getRecoveryActions);

module.exports = router;
