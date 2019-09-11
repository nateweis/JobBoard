const db = require('../db/db_connection');

const login = (req, res) => {
    console.log(req.body);
    db.one('SELECT * FROM users WHERE username = ${username} AND password = ${password}', req.body)
    .then((data) => {
        res.json({info:data, message:"success"})
    })
    .catch((err) => {
      res.json({err:err})
    })
}

module.exports = {
    login
}

