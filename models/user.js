const db = require('../db/db_connection');

const login = (req, res) => {
    db.one('SELECT * FROM users WHERE username = ${username} AND password = ${password}', req.body)
    .then()
}