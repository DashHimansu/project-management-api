const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { pool, initializeDatabase } = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/project', require("./src/routes/projectRoutes"));

app.get('/test', (req, res) => {
    res.status(200).send('<h1>hello hii welcome</h1>');
});

const PORT = process.env.PORT || 8000;

// start application properly
(async () => {
    try {
        //  Test DB connection
        await pool.query("SELECT 1");
        console.log(" DB Connected");

        //  Create table if not exists
        await initializeDatabase();

        //  Start server
        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error(" Failed to start application:", error);
    }
})();
