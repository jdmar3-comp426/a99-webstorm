// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('users.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accountinfo';`);
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE accountinfo ( id INTEGER PRIMARY KEY , username TEXT, password TEXT,emailAddress TEXT, highestScore INTEGER, numOfGames INTEGER );
		INSERT INTO acountinfo (username, password,highestScore,numOfGames) VALUES ('admin','000106','123@321.com',0,0)
    `;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized!');
} 
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db