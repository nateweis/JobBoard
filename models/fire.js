const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');
const path = require('path');
const QueryFile = require('pg-promise').QueryFile;
require('dotenv').config()
const secret = process.env.SECRET

function sql(file) {
    const fullPath = path.join(__dirname, file); 
    return new QueryFile(fullPath, {minify: true});
}
const sqlUpdateFire = sql('../db/updateFire.sql')
const sqlNewFire = sql('../db/newFire.sql')

const indexScreen = (req, res) => {
    db.any('SELECT fire_jobs.id, fire_jobs.completed, fire_jobs.due_date, fire_jobs.job_order_number, fire_jobs.description, fire_jobs.requested_by, fire_jobs.job_address, fire_jobs.stage FROM fire_jobs')
    .then((data) => { 
        jwt.verify(req.token, secret, (err, userInfo) => {
           if(err){res.json({message:'403 forbiddin'})} 
           else{res.json({data, message: "success",userInfo})}
        })         
    })
    .catch((err) => {
        res.json({err})
        // console.log(err);
        
    })
}



const showScreen = (req, res) => {
    db.one('SELECT * FROM fire_jobs WHERE id = $1', req.params.id)
    .then((data) => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({data, message: "success",userInfo})}
         }) 
    })
    .catch((err) => {
        res.json({err})
    })
}



//update the fire job
const updateJob = (req, res) => {
    // console.log(req.body);
   db.none(sqlUpdateFire, req.body)
   .then(() => {   
    jwt.verify(req.token, secret, (err, userInfo) => {
        if(err){res.json({message:'403 forbiddin'})} 
        else{res.json({message:"check it out, it worked"})}
       })
   })
   .catch((err) => {
    //    console.log(err);
       res.json(err)
   })
}

// turn a job complete/uncomplete
const completeJob = (req, res) => {
    db.none('UPDATE fire_jobs SET completed = $1 WHERE id = $2', [req.body.completed, req.body.id])
    .then(() => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({message:"check it out, it worked"})}
           })
    })
    .catch((err) => {
        res.json(err)
    })
}

//  add a new fire job
const newFireJob = (req, res) => {
    db.none(sqlNewFire, req.body)
    .then(() => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({message:"check it out, it worked"})}
           })
    })
    .catch((err) => {
        res.json({err})
        console.log(err);
        
    })
}

// Delete from fire jobs
const deleteJob = (req,res) => {
    db.none('DELETE FROM fire_jobs WHERE id = $1', req.params.id)
    .then(() => {
        jwt.verify(req.token, secret, (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({message:"check it out, it worked"})}
           })
    })
    .catch((err) => {
        res.json({err})
        console.log(err);
        
    })
}

module.exports = {
    indexScreen,
    showScreen,
    updateJob,
    newFireJob,
    deleteJob,
    completeJob
}