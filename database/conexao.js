import { MongoClient } from "mongodb";
import "dotenv/config"
const url = process.env.URL;
const client = new MongoClient(url);

await client.connect();

const database = client.db(process.env.DB);

export default database;