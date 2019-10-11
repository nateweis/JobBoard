INSERT INTO fire_jobs(
job_order_number, date_created,description, requested_by,
job_address, stage,pump_po,pump_eta,pump_erp,pump_received,
updated_by,last_updated, due_date,completed,
shipdate_packlist,deposite_amount,notes,
carrier,bol_number,pro_number,invoice_number)
VALUES(
(SELECT NULLIF(${job_order_number} ,NULL)),
(SELECT NOW()::DATE),
(SELECT NULLIF(${description} ,NULL)),
(SELECT NULLIF(${requested_by} ,NULL)),
(SELECT NULLIF(${job_address} ,NULL)),
(SELECT NULLIF(${stage} ,NULL)::integer),
(SELECT NULLIF(${pump_po} ,NULL)),
(SELECT NULLIF(${pump_eta} ,NULL)::date),
(SELECT NULLIF(${pump_erp} ,NULL)),
(SELECT NULLIF(${pump_received} ,NULL)::boolean),
${updated_by},
(SELECT NOW()::DATE),
(SELECT NULLIF(${due_date} ,NULL)::date),
(SELECT NULLIF(${completed} ,NULL)::boolean),
(SELECT NULLIF(${shipdate_packlist} ,NULL)),
(SELECT NULLIF(${deposite_amount} ,NULL)),
(SELECT NULLIF(${notes} ,NULL)),
(SELECT NULLIF(${carrier} ,NULL)),
(SELECT NULLIF(${bol_number} ,NULL)),
(SELECT NULLIF(${pro_number} ,NULL)),
(SELECT NULLIF(${invoice_number} ,NULL))
)