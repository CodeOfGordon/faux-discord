import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();


export const newPool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT)
})