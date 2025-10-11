import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',        // your database host
  user: 'root',             // your MySQL username
  password: '', // your MySQL password
  database: 'salesboard', // your database name
});
