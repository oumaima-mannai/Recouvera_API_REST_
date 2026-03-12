const Client = require('../models/Client');
const { validateClient, validateClientUpdate } = require('../validators/clientValidator');

// @desc    Create a new client
// @route   POST /api/clients
// @access  Private (Agent/Manager/Admin)
const createClient = async (req, res) => {
    const { error } = validateClient(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const clientExists = await Client.findOne({ email: req.body.email });
        if (clientExists) {
            return res.status(400).json({ message: 'Client with this email already exists' });
        }

        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Get client by ID
// @route   GET /api/clients/:id
// @access  Private
const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
const updateClient = async (req, res) => {
    const { error } = validateClientUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private
const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json({ message: 'Client removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
};
