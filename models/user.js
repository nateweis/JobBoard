const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');


  
  const login = (req,res) => {
    db.one('SELECT * FROM users WHERE username = $1', req.body.username)
    .then((data) => {
      if(req.body.password == data.password){
        // makes a token on login
      jwt.sign(data, 'feedmecmore',{expiresIn: '5m'},(err, token) => {
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


  