const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET


addItem = (req, res) => {
    db.none('INSERT INTO stock(name, edit, id, update_date, update_by) VALUES (${name}, ${edit}, ${id}, (SELECT NOW()), ${user})', req.body)
    .then(() => {
        jwt.verify(req.token, secret, (err, userInfo) => {
          if(err){res.json({message:'403 forbiddin not logged in'})} 
          else{res.json({message:"item has been added"})}
         })
      })
      .catch((err) => {
        res.json({err, message:"item not add"})
        console.log(err);
      })
}

getItems = (req, res) => {
    db.any('SELECT * FROM stock ORDER BY update_date DESC')
    .then((data) => {
        jwt.verify(req.token, secret, (err, userInfo) => {
          if(err){res.json({message:'403 forbiddin not logged in'})} 
          else{res.json({message:"heres your stock list ",data })}
         })
      })
      .catch((err) => {
        res.json({err, message:"invalid request on stock pull"})
        console.log(err);
      })
}

deleteItem = (req, res) => {
    db.none('DELETE FROM stock WHERE id = $1', req.params.id)
    .then(() => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({message:"item got deleted"})}
           })
    })
    .catch((err) => {
        res.json({err})
        console.log(err);
        
    })
}



module.exports = {
    addItem,
    getItems,
    deleteItem
}