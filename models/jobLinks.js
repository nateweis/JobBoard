const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET

const retriveLinkJobs = (req, res) => {
    db.any('SELECT * FROM jobs_link WHERE job_count < number_linked')
    .then((data) => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({message:"got the list of link jobs", data})}
         })
      })
      .catch((err) => {
        console.log(err);
        res.json({err, message:"problem on retriving link jobs info"})
      })
}

const addToLinkJobs = (req, res) => {
    db.none('INSERT INTO jobs_link (number_linked, job_count, title) VALUES (${number_linked}, 1, ${title})', req.body)
    .then(() => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({message:"inserted new link job"})}
           })
    })
    .catch((err) => {
        res.json({err, message: "problem inserting the new job link into the database"})
        console.log(err);
        
    })
}


module.exports = {
    retriveLinkJobs,
    addToLinkJobs
}