const db = require('../db/db_connection');
const jwt = require('jsonwebtoken');

const indexScreen = (req, res) => {
    db.any('SELECT booster_jobs.id, booster_jobs.job_order_number, booster_jobs.description, booster_jobs.requested_by, booster_jobs.job_address, booster_jobs.stage FROM booster_jobs')
    .then((data) => { 
        jwt.verify(req.token, 'feedmecmore', (err, userInfo) => {
           if(err){res.json({message:'403 forbiddin'})} 
           else{res.json({data, message: "success",userInfo})}
        })         
    })
    .catch((err) => {
        res.json({err})
        console.log(err);
        
    })
}

const showScreen = (req, res) => {
    db.one('SELECT * FROM booster_jobs WHERE id = $1', req.params.id)
    .then((data) => {
        jwt.verify(req.token, 'feedmecmore', (err, userInfo) => {
            if(err){res.json({message:'403 forbiddin'})} 
            else{res.json({data, message: "success",userInfo})}
         }) 
    })
    .catch((err) => {
        res.json({err})
    })
}

module.exports = {
    indexScreen,
    showScreen
}