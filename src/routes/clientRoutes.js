const express = require('express');
const {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
} = require('../controllers/clientController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply protect middleware to all client routes
router.use(protect);

router.route('/')
    .post(createClient)
    .get(getClients);

router.route('/:id')
    .get(getClientById)
    .put(updateClient)
    .delete(deleteClient);

module.exports = router;
