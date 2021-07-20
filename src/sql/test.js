const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost/sql_crm");

async function show() {
  let results = await sequelize.query(
    `SELECT a.country,MAX(total) FROM
    (SELECT country,count(*) as total  
    FROM country,client 
    WHERE client.country_id=country.id AND client.sold=1  
    GROUP BY country ) as a`
  );
  console.log(results[0][0].country);
}
show();
