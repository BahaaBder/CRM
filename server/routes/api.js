const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root:@localhost/sql_crm");
router.get("/clients", function (req, res) {
  const from = req.query.from;
  const to = req.query.to;
  if (from != undefined && to != undefined) {
    sequelize
      .query(
        `
         SELECT cl.id,last,first,co.country
         ,date,et.email_type,sold,o.owner
         FROM
         client as cl,
         country as co,
         email_type as et,
         owner as o
         WHERE 
         cl.email_type_id=et.id 
         AND
         cl.owner_id=o.id
         AND
         cl.country_id=co.id
  `
      )
      .then(function ([results, metadata]) {
        res.send(results.slice(from, to));
      });
  } else {
    sequelize
      .query(
        `
         SELECT * FROM client as cl, country as co , email_type as et, owner as o
         WHERE cl.email_type_id=et.id 
         AND
         cl.owner_id=o.id
         AND
         cl.country_id=co.id
       `
      )
      .then(function ([results, metadata]) {
        res.send(results);
      });
  }
});

router.get("/topOwners", function (req, res) {
  sequelize
    .query(
      `SELECT owner.owner,COUNT(*) AS total FROM client ,owner
  WHERE client.owner_id=owner.id 
  AND sold=1 
  GROUP BY owner
  ORDER BY  total desc
  LIMIT 3`
    )
    .then(function ([results]) {
      res.send(results);
    });
});

router.get("/allClients", function (req, res) {
  sequelize
    .query(
      `SELECT * FROM client ,owner
       WHERE client.owner_id=owner.id
  `
    )
    .then(function ([clients, metadata]) {
      res.send(clients);
    });
});

router.get("/mostcountrysales", function (req, res) {
  sequelize
    .query(
      `SELECT a.country,MAX(total) FROM
  (SELECT country,count(*) as total  
  FROM country,client 
  WHERE client.country_id=country.id AND client.sold=1  
  GROUP BY country ) as a`
    )
    .then(function ([results, metadata]) {
      res.send(results);
    });
});

router.get("/salesByCountry", function (req, res) {
  sequelize
    .query(
      `SELECT country,count(*) AS Sales FROM client AS c , country AS co
  WHERE c.country_id=co.id AND sold=1
  GROUP BY country `
    )
    .then(function ([results]) {
      res.send(results);
    });
});

router.get("/owners", function (req, res) {
  sequelize.query(`SELECT * FROM owner`).then(function ([owners, metadata]) {
    res.send(owners);
  });
});

router.put("/updatesale", function (req, res) {
  let clientName = req.body.clientName;
  sequelize.query(`UPDATE client 
  SET sold=1 
  WHERE first=${clientName}`);
});

router.put("/owner", function (req, res) {
  sequelize.query(
    `UPDATE client
     SET client.owner_id=(SELECT id FROM owner
     WHERE owner.owner="${req.query.owner}")
     WHERE client.first="${req.query.name}"
  `
  );
  res.send("success");
});

router.put("/sendemail", function (req, res) {
  sequelize.query(
    `UPDATE client
     SET client.email_type_id=(SELECT id FROM email_type
     WHERE email_type.email_type="${req.query.email}")
     WHERE client.first="${req.query.name}"
  `
  );
  res.send("success");
});

router.put("/updateclient", async function (req, res) {
  let oldFirstName = req.body.oldData.oldfirstName;
  let oldLastName = req.body.oldData.oldsurName;
  let oldCountry = req.body.oldData.oldcountry;
  let newFirstName = req.body.newName;
  let newLastName = req.body.newSurName;
  let newCountry = req.body.newCountry;
  // console.log(req.body);
  let resultsOld = await sequelize.query(
    `SELECT id FROM country WHERE country='${oldCountry}'`
  );
  let oldCountryId = resultsOld[0][0].id;

  let resultsNew = await sequelize.query(
    `SELECT id FROM country WHERE country='${newCountry}'`
  );
  let newCountryId = resultsNew[0][0].id;
  sequelize.query(`UPDATE client
   SET first='${newFirstName}',last='${newLastName}',country_id='${newCountryId}'
   WHERE first='${oldFirstName}' AND last='${oldLastName}' AND country_id='${oldCountryId}'
   `);
});
router.post("/clientSave", async function (req, res) {
  let clientData = req.body;
  try {
    let countryIdQuery = `SELECT id FROM country WHERE country = '${clientData.countryName}'`;
    let countryIdData = await sequelize.query(countryIdQuery);
    let countryId = countryIdData[0][0].id;
    let ownerIdQuery = `SELECT id FROM owner WHERE owner = '${clientData.ownerName}'`;
    let ownerIdData = await sequelize.query(ownerIdQuery);
    if (!ownerIdData[0][0]) {
      let ownerIdQuery = `INSERT INTO owner VALUES(null,'${clientData.ownerName}')`;
      ownerIdData = await sequelize.query(ownerIdQuery);
    }
    let ownerId = ownerIdData[0][0].id;
    let date = new Date();
    let strDate = "m/d/Y"
      .replace("Y", date.getFullYear())
      .replace("m", date.getMonth() + 1)
      .replace("d", date.getDate());
    let dataQuery = `INSERT INTO client (last,first,date,sold,owner_id,country_id)
                       VALUES ('${clientData.lastName}','${
      clientData.firstName
    }','${strDate}',${0},${ownerId},${countryId})`;
    let clientsData = await sequelize.query(dataQuery);
    res.send("Update");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
