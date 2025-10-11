import {db} from '../database/connection/connection'

export async function createProductTable() {
  try {
    const connection = await db.getConnection();
    await connection.query(`
        CREATE TABLE Products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ProductName VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `)
    connection.release();
    console.log('Table "Products" created successfully.');
  }catch (error) {
    console.error('Error creating ProductTable:', error);
  }
}
createProductTable()