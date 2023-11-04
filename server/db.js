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

module.exports = { query: (text, params) => pool.query(text, params) };
