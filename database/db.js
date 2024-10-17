const sqlite3 = require('sqlite3').verbose();
const path = require("path")

const dbPath = path.resolve(__dirname, "./todos.db")
const db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
        console.log("Error opening database:", error.message)
    } else {
        console.log("Connected to SQLite database")
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0
    )`);
});

module.exports = db;
