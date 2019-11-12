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
const sqlUpdateSewer = sql('../db/updateSewer.sql')
const sqlNewSewer = sql('../db/newSewer.sql')

const indexScreen = (req, res) => {
    db.any('SELECT sewage_jobs.id, sewage_jobs.completed, sewage_jobs.job_order_number, sewage_jobs.description, sewage_jobs.requested_by, sewage_jobs.job_address, sewage_jobs.stage FROM sewage_jobs')
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
    db.one('SELECT * FROM sewage_jobs WHERE id = $1', req.params.id)
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



//update the sewage job
const updateJob = (req, res) => {
    // console.log(req.body);
   db.none(sqlUpdateSewer, req.body)
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
    db.none('UPDATE sewage_jobs SET completed = $1 WHERE id = $2', [req.body.completed, req.body.id])
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

//  add a new sewage job
const newSewerJob = (req, res) => {
    db.none(sqlNewSewer, req.body)
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

// Delete from sewage jobs
const deleteJob = (req,res) => {
    db.none('DELETE FROM sewage_jobs WHERE id = $1', req.params.id)
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
    newSewerJob,
    deleteJob,
    completeJob
}