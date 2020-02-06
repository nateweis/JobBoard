-- 'UPDATE booster_jobs SET job_order_number = ${job_order_number}, notes=${notes}, 
-- shipdate_packlist=${shipdate_packlist}, completed=${completed}, due_date=${due_date}, 
-- controller_received=${controller_received}, controller_eta=${controller_eta}, controller_po=${controller_po}, 
-- last_updated=(SELECT NOW()::DATE), updated_by=${user}, pump_received=${pump_received}, pump_eta=${pump_eta},
--  pump_po=${pump_po}, stage=${stage}, job_address=${job_address}, requested_by =${requested_by}, 
--  description = ${description},  date_created =${date_created}  WHERE id = ${id}'

UPDATE booster_jobs
SET
job_order_number =(SELECT NULLIF(${job_order_number} ,NULL)),
notes=(SELECT NULLIF(${notes} ,NULL)),
shipdate_packlist=(SELECT NULLIF(${shipdate_packlist} ,NULL)),
deposit_amount=(SELECT NULLIF(${deposit_amount} ,NULL)),
completed=(SELECT NULLIF(${completed} ,NULL)::boolean),
due_date=(SELECT TO_DATE((SELECT NULLIF(${due_date} ,NULL)),'YYYY-MM-DD')),
controller_received=(SELECT NULLIF(${controller_received} ,NULL)::boolean),
controller_eta=(SELECT TO_DATE((SELECT NULLIF(${controller_eta} ,NULL)),'YYYY-MM-DD')),
controller_po=(SELECT NULLIF(${controller_po} ,NULL)),
last_updated=(SELECT NOW()::DATE),
updated_by=${user},
pump_received=(SELECT NULLIF(${pump_received} ,NULL)::boolean),
pump_eta=(SELECT TO_DATE((SELECT NULLIF(${pump_eta} ,NULL)), 'YYYY-MM-DD')),
pump_po =(SELECT NULLIF(${pump_po},NULL)),
stage=(SELECT NULLIF(${stage} ,NULL)::integer),
job_address=(SELECT NULLIF(${job_address} ,NULL)),
requested_by =(SELECT NULLIF(${requested_by} ,NULL)),
carrier =(SELECT NULLIF(${carrier} ,NULL)),
bol_number =(SELECT NULLIF(${bol_number} ,NULL)),
pro_number =(SELECT NULLIF(${pro_number} ,NULL)),
invoice_number =(SELECT NULLIF(${invoice_number} ,NULL)),
description = (SELECT NULLIF(${description} ,NULL)),
quantity = (SELECT NULLIF(${quantity} ,NULL)::integer),
connected_jobs = (SELECT NULLIF(${connected_jobs} ,NULL))
WHERE id = ${id};



