const express = require('express'); //importe le framework express
const cors = require('cors'); //importe le module cors

const app = express(); //crée une instance d'application express : l’objet central qui gère les routes, middlewares et serveur

// Middlewares
app.use(cors()); //permet d'autoriser les requêtes provenant de différentes origines
app.use(express.json()); // middleware : Transforme automatiquement le corps des requêtes JSON en objet req.body

// Import des routes
const authRoutes = require('./src/routes/authRoutes');
const clientRoutes = require('./src/routes/clientRoutes');
const invoiceRoutes = require('./src/routes/invoiceRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const recoveryActionRoutes = require('./src/routes/recoveryActionRoutes');
const statisticsRoutes = require('./src/routes/statisticsRoutes');
const setupSwagger = require('./src/config/swagger');

// Swagger setup
setupSwagger(app);

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/recovery-actions', recoveryActionRoutes);
app.use('/api/statistics', statisticsRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Recouvra+ API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? undefined : err.message,
  });
});

module.exports = app;
