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

const newLinkJobs = (req, res) => {
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

const addToLinkJobs = (req, res) => {
    db.none('UPDATE jobs_link SET job_count = ${job_count} WHERE id = ${id}', req.body)
    .then(() => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({message:"updated link job"})}
           })
    })
    .catch((err) => {
        res.json({err, message: "problem updating job link in the database"})
        console.log(err);
        
    })

    // cleanTable();
}

const cleanTable = () => {
    db.none('DELETE FROM jobs_link WHERE job_count = number_linked')
    .then(() => {
        console.log("Deleted a Full Link")
    })
    .catch((err) => {
        console.log(err)
        console.log("Desbite there being a full db, there was a error")
    })
}


module.exports = {
    retriveLinkJobs,
    addToLinkJobs,
    newLinkJobs
}