const db = require('../db/db_connection');

const indexScreen = (req, res) => {
    db.any('SELECT booster_jobs.id, booster_jobs.job_order_number, booster_jobs.description, booster_jobs.requested_by, booster_jobs.job_address, booster_jobs.stage FROM booster_jobs')
    .then((data) => {
        res.json({data, message: "success"})
    })
    .catch((err) => {
        res.json({err})
        console.log(err);
        
    })
}

module.exports = {
    indexScreen
}