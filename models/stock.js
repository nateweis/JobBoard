const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET


const addItem = (req, res) => {
    db.none('INSERT INTO stock(name, edit, id, update_date, update_by, catigory) VALUES (${name}, ${edit}, ${id}, (SELECT NOW()), ${user}, ${catigory})', req.body)
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

const getItems = (req, res) => {
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

const deleteItem = (req, res) => {
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

const updateItem = (req, res) => {
    db.none('UPDATE stock SET name= ${name}, edit = false, update_date = (SELECT NOW()), update_by = ${user}, catigory = ${catigory} WHERE id = ${id}', req.body)
    .then(() => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({message:"item got updated"})}
           })
    })
    .catch((err) => {
        res.json({err})
        console.log(err);
        
    })
}

const getStockTextItem = (req, res) => {
    db.one('SELECT * FROM stockText')
    .then((data) => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({message:"pulled the stock text", pulledData: data})}
           })
    })
    .catch((err) => {
        res.json({err})
        console.log(err);
        
    })
}

const updateStockTextItem = (req, res) => {
    db.none('UPDATE stockText SET stock = ${stock} WHERE id = ${id}', req.body)
    .then(() => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({message:"item got updated"})}
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
    deleteItem,
    updateItem,
    getStockTextItem,
    updateStockTextItem
}