-- 'UPDATE booster_jobs SET job_order_number = ${job_order_number}, notes=${notes}, 
-- shipdate_packlist=${shipdate_packlist}, completed=${completed}, due_date=${due_date}, 
-- controller_received=${controller_received}, controller_eta=${controller_eta}, controller_po=${controller_po}, 
-- last_updated=(SELECT NOW()::DATE), updated_by=${user}, pump_received=${pump_received}, pump_eta=${pump_eta},
--  pump_po=${pump_po}, stage=${stage}, job_address=${job_address}, requested_by =${requested_by}, 
--  description = ${description},  date_created =${date_created}  WHERE id = ${id}'

UPDATE booster_jobs
SET
job_order_number = ${job_order_number},
notes=${notes},
shipdate_packlist=${shipdate_packlist},
completed=${completed},
due_date=${due_date},
controller_received=${controller_received},
controller_eta=${controller_eta},
controller_po=${controller_po},
last_updated=(SELECT NOW()::DATE),
updated_by=${user},
pump_received=${pump_received},
pump_eta=${pump_eta},
pump_po=${pump_po},
stage=${stage},
job_address=${job_address},
requested_by =${requested_by},
description = ${description}
WHERE id = ${id};


