USE sql_crm; 
--  SELECT first,last,country FROM client ,country 
--  WHERE  client.country_id=country.id 
-- SELECT MAX(T.total) FROM  (SELECT country,count(*) AS total 
--   FROM country,client 
--   WHERE client.country_id=country.id AND client.sold=1) AS T
--   GROUP BY country
  
-- (SELECT country,count(*) as total  
-- FROM country,client 
-- WHERE client.country_id=country.id AND client.sold=1  
--  GROUP BY country) AS T
  
-- SELECT country,MAX(total) as max FROM (SELECT country,count(*) as total  
-- FROM country,client 
-- WHERE client.country_id=country.id AND client.sold=1  
--  GROUP BY country) AS T 

SELECT a.country,MAX(total) FROM
(SELECT country,count(*) as total  
FROM country,client 
WHERE client.country_id=country.id AND client.sold=1  
GROUP BY country ) as a