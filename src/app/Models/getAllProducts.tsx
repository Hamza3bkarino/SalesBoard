import { FieldPacket, ResultSetHeader } from "mysql2";
import { db } from "../api/database/connection/connection";



export async function getallproducts(): Promise<ResultSetHeader > {
  const [result]: [ResultSetHeader , FieldPacket[]] = await db.query(
    'SELECT ProductName FROM products'
  );
  return result;
}