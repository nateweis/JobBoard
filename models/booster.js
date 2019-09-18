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

//update the booster job
const updateJob = (req, res) => {
    console.log(req.body);
   db.none('UPDATE booster_jobs SET job_order_number = ${job_order_number}, notes=${notes}, shipdate_packlist=${shipdate_packlist}, completed=${completed}, due_date=${due_date}, controller_received=${controller_received}, controller_eta=${controller_eta}, controller_po=${controller_po}, last_updated=(SELECT NOW()::DATE), updated_by=${user}, pump_received=${pump_received}, pump_eta=${pump_eta}, pump_po=${pump_po}, stage=${stage}, job_address=${job_address}, requested_by =${requested_by},  description = ${description},  date_created =${date_created}  WHERE id = ${id}',req.body)
   .then(() => {   
    jwt.verify(req.token, 'feedmecmore', (err, userInfo) => {
        if(err){res.json({message:'403 forbiddin'})} 
        else{res.json({message:"check it out, it worked"})}
       })
   })
   .catch((err) => {
       console.log(err);
       res.send(err)
   })
}

module.exports = {
    indexScreen,
    showScreen,
    updateJob
}