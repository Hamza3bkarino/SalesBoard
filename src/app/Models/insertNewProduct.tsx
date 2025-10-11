import { FieldPacket, ResultSetHeader } from "mysql2";
import { db } from "../api/database/connection/connection";

 interface params{
    ProductName:string,
 }

export async function insertNewProduct(ProductName: string): Promise<ResultSetHeader > {
  const [result]: [ResultSetHeader , FieldPacket[]] = await db.query(
    'INSERT INTO products (ProductName) VALUES (?)',
    [ProductName]
  );
  return result;
}
export async function checkProductName(ProductName: string): Promise<ResultSetHeader > {
  const [result]: [ResultSetHeader , FieldPacket[]] = await db.query(
    'SELECT productName from Products WHERE ProductName = ?',
    [ProductName]
  );
  return result;
}