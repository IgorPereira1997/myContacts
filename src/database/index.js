const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 15433,
  user: 'mycontactsadmin',
  password: 'admin',
  database: 'mycontacts'
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
}
