const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost/sql_crm");

async function show() {
  let results = await sequelize.query(
    `SELECT id FROM country WHERE country="Armenia"`
  );
  console.log(results[0][0].id);
}
show();
