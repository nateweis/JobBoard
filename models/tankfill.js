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
const sqlUpdateTankfill = sql('../db/updateTankfill.sql')
const sqlNewTankfill = sql('../db/newTankfill.sql')

const indexScreen = (req, res) => {
    db.any('SELECT tankfill_jobs.id, tankfill_jobs.completed, tankfill_jobs.due_date, tankfill_jobs.job_order_number, tankfill_jobs.description, tankfill_jobs.requested_by, tankfill_jobs.job_address, tankfill_jobs.stage FROM tankfill_jobs')
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
    db.one('SELECT * FROM tankfill_jobs WHERE id = $1', req.params.id)
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



//update the Tankfill job
const updateJob = (req, res) => {
    // console.log(req.body);
   db.none(sqlUpdateTankfill, req.body)
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
    db.none('UPDATE tankfill_jobs SET completed = $1 WHERE id = $2', [req.body.completed, req.body.id])
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

//  add a new tankfill job
const newTankfillJob = (req, res) => {
    db.none(sqlNewTankfill, req.body)
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

// Delete from Tankfill jobs
const deleteJob = (req,res) => {
    db.none('DELETE FROM tankfill_jobs WHERE id = $1', req.params.id)
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
    newTankfillJob,
    deleteJob,
    completeJob
}