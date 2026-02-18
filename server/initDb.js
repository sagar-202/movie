const fs = require('fs');
const path = require('path');
const db = require('./db');

const initDb = async () => {
    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('🔄 Running initialization script...');

        await db.query(schemaSql);

        console.log('✅ Users table created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
};

initDb();
