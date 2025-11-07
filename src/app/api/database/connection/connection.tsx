import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,        // your database host
  user: process.env.DB_USER,             // your MySQL username
  password: process.env.DB_PASSWORD, // your MySQL password
  database: process.env.DB_NAME, // your database name
});
