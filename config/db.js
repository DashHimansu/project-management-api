const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "project_api"
});

const initializeDatabase = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS projects (
            id VARCHAR(36) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            clientName VARCHAR(255) NOT NULL,
            status ENUM('active','on_hold','completed') NOT NULL,
            startDate DATE NOT NULL,
            endDate DATE NULL,
            deleted BOOLEAN DEFAULT FALSE,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
                ON UPDATE CURRENT_TIMESTAMP
        )
    `);

    console.log("✅ Projects table ready");
};

module.exports = {
    pool,
    initializeDatabase
};
