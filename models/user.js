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
  
// update a single password
  const updatePassword = (req, res) => {
    db.one('SELECT * FROM users WHERE id = $1', req.body.user.id)
    .then((data) => {
      if(req.body.old_pass === data.password){
        db.none('UPDATE users SET password = $1 WHERE id = $2',[req.body.new_pass, req.body.user.id])
        .then(() => {
          jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'password updated auth problem'})} 
            else{res.json({message:"check it out, it worked"})}
           })
        })
        .catch((err) => {
          res.json({err, message:"error", status:400})
          console.log(err);
        })
      }else{
        res.json({message: "incorrect password for user"})
      }
    })
    .catch((err) => {
      res.json({message:"error", status:404, err}).status(404)
      console.log(err)
    })
  }

  // get all the users info
  const getUsers = (req, res) => {
    db.any('SELECT * FROM users')
    .then((data) => {
      jwt.verify(req.token, secret, (err, userInfo) => {
        if(err){res.json({message:'auth problem'})} 
        else{res.json({message:"success", allUserInfo: data})}
       })
    })
    .catch((err) => {
      console.log(err);
      res.json({err, message:"problem on retriving users info"})
    })
  }

  // Delete a user from db 
  const deleteUser = (req, res) => {
    db.none('DELETE FROM users WHERE id = $1', req.params.id)
    .then(() => {
      jwt.verify(req.token, secret, (err, userInfo) => {
        if(err){res.json({message:'403 forbiddin'})} 
        else{res.json({message:"user deleted"})}
       })
    })
    .catch((err) => {
      res.json({err, message:"didnt delete"})
      console.log(err);       
    })
  }

  // Update any user any info
  const updateAnyUserInfo = (req, res) => {
    
  }

  
  
  
  module.exports ={
    login,
    updatePassword,
    getUsers
  }


  