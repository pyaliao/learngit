SELECT
  c1.cust_id,
  c1.cust_name.c1.cust_contact
FROM
  customers AS c1,
  customers AS c2
WHERE
  c1.cust_name = c2.cust_name
  AND c2.cust_contact = 'Jim Jones';