USE sql_crm; 
 SELECT owner.owner,COUNT(*) AS total FROM client ,owner
WHERE client.owner_id=owner.id 
AND sold=1 
GROUP BY owner
ORDER BY  total desc
 
