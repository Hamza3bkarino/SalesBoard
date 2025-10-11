import { db } from '../my-app/src/app/api/database/connection/connection'; 

async function testConnection() {
  try {
    const [rows]: any = await db.query('SELECT NOW() AS time');
    console.log('Database connected. Current time:', rows[0].time);
  } catch (err: any) {
    console.error('Database connection failed:', err.message);
  } finally {
    await db.end(); // close pool
  }
}

testConnection();
