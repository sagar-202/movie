const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test DB Connection
const testDbConnection = async () => {
    try {
        const connection = await db.getConnection();
        console.log('✅ MySQL Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
};

testDbConnection();

// Basic Route
app.get('/', (req, res) => {
    res.send('Movie-Z API is running');
});

// Routes
app.use('/api/auth', require('./routes/auth'));

// Debug Routes
app.get('/api/debug/tables', async (req, res) => {
    try {
        const [rows] = await db.query('SHOW TABLES');
        res.json(rows);
    } catch (error) {
        console.error('Debug Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/debug/users-structure', async (req, res) => {
    try {
        const [rows] = await db.query('DESCRIBE users');
        res.json(rows);
    } catch (error) {
        console.error('Debug Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// TEMPORARY: Debug route to check if users are being stored
app.get('/api/debug/all-users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, username, email, phone, password, created_at FROM users');
        res.json(rows);
    } catch (error) {
        console.error('Debug Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
