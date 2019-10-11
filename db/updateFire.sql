UPDATE fire_jobs
SET
job_order_number =(SELECT NULLIF(${job_order_number} ,NULL)),
notes=(SELECT NULLIF(${notes} ,NULL)),
shipdate_packlist=(SELECT NULLIF(${shipdate_packlist} ,NULL)),
deposite_amount=(SELECT NULLIF(${deposite_amount} ,NULL)),
completed=(SELECT NULLIF(${completed} ,NULL)::boolean),
due_date=(SELECT TO_DATE((SELECT NULLIF(${due_date} ,NULL)),'YYYY-MM-DD')),
last_updated=(SELECT NOW()::DATE),
updated_by=${user},
pump_received=(SELECT NULLIF(${pump_received} ,NULL)::boolean),
pump_eta=(SELECT TO_DATE((SELECT NULLIF(${pump_eta} ,NULL)), 'YYYY-MM-DD')),
pump_erp =(SELECT NULLIF(${pump_erp},NULL)),
pump_po =(SELECT NULLIF(${pump_po},NULL)),
stage=(SELECT NULLIF(${stage} ,NULL)::integer),
job_address=(SELECT NULLIF(${job_address} ,NULL)),
requested_by =(SELECT NULLIF(${requested_by} ,NULL)),
carrier =(SELECT NULLIF(${carrier} ,NULL)),
bol_number =(SELECT NULLIF(${bol_number} ,NULL)),
pro_number =(SELECT NULLIF(${pro_number} ,NULL)),
invoice_number =(SELECT NULLIF(${invoice_number} ,NULL)),
description = (SELECT NULLIF(${description} ,NULL))
WHERE id = ${id};