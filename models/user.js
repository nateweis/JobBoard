const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET


  
  const login = (req,res) => {
    db.one('SELECT * FROM users WHERE username = $1', req.body.username)
    .then((data) => {
      if(req.body.password == data.password){
        // makes a token on login
      jwt.sign(data, secret,{expiresIn: '1d'},(err, token) => {
        res.status(201).append('Accept','true').json({token})
      })
     
      }
      else{
        res.status(401).json({message:"attempt failed"})
                
      }
    })
    .catch((err) => {
      res.json({message:"attempt failed"})
    })
  }
  
  const getUser = (req,res) => {
    if(req.session.currentUser){
      db.one('SELECT * FROM users WHERE id = $1',[req.session.currentUser.id])
      .then((data) => {
        console.log(data);
        res.json(data)
      })
      .catch((err) => {
        console.log(err);
        res.json(err)
      })
    }
  }

  
  
  
  module.exports ={
    login,
    getUser
  }


  