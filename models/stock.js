const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET


addItem = (req, res) => {
    db.none('INSERT INTO stock(name, edit, id, update_date, update_by) VALUES (${name}, ${edit}, ${id}, (SELECT NOW()::DATE), ${user})', req.body)
    .then(() => {
        jwt.verify(req.token, secret, (err, userInfo) => {
          if(err){res.json({message:'403 forbiddin not logged in'})} 
          else{res.json({message:"itme has been added"})}
         })
      })
      .catch((err) => {
        res.json({err, message:"item not add"})
        console.log(err);
      })
}



module.exports = {
    addItem
}