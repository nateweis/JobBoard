INSERT INTO booster_jobs(
job_order_number, date_created,description, requested_by,
job_address, stage,pump_po,pump_eta,pump_received,
updated_by,last_updated, controller_po, controller_eta,
controller_received, due_date,completed,
shipdate_packlist,notes)
VALUES(
(SELECT NULLIF(${job_order_number} ,NULL)),
(SELECT NOW()::DATE),
(SELECT NULLIF(${description} ,NULL)),
(SELECT NULLIF(${requested_by} ,NULL)),
(SELECT NULLIF(${job_address} ,NULL)),
(SELECT NULLIF(${stage} ,NULL)::integer),
(SELECT NULLIF(${pump_po} ,NULL)),
(SELECT NULLIF(${pump_eta} ,NULL)::date),
(SELECT NULLIF(${pump_received} ,NULL)::boolean),
${updated_by},
(SELECT NOW()::DATE),
(SELECT NULLIF(${controller_po} ,NULL)),
(SELECT NULLIF(${controller_eta} ,NULL)::date),
(SELECT NULLIF(${controller_received} ,NULL)::boolean),
(SELECT NULLIF(${due_date} ,NULL)::date),
(SELECT NULLIF(${completed} ,NULL)::boolean),
(SELECT NULLIF(${shipdate_packlist} ,NULL)),
(SELECT NULLIF(${notes} ,NULL))
)