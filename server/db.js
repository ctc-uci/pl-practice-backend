const { Pool } = require('pg');
// const pgp = require('pg-promise')({});
require('dotenv').config();

const pool = new Pool({
  host: 'ctc-practice.cfnjxhawdzer.us-west-2.rds.amazonaws.com',
  user: 'ctc',
  password: 'practicemakesperfect',
  port: 5432,
  database: 'postgres',
});

// const cn = `postgres://${process.env.AWS_USER}:${encodeURIComponent(process.env.AWS_PASSWORD)}@${
//   process.env.AWS_HOST
// }:${process.env.AWS_PORT}/${process.env.AWS_DB_NAME}`; // For pgp
// const db = pgp(cn);

module.exports = { query: (text, params) => pool.query(text, params) };
