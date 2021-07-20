USE sql_crm; 
--  SELECT first,last,country FROM client ,country 
--  WHERE  client.country_id=country.id 
  SELECT id,country FROM country 
  WHERE country="Greece" OR country="France"

