import configs from "../knexfile";
import knex from "knex";

const name = `database-setup.js`;
const environment =
  process.env.NODE_ENV !== "local-production" ? "development" : "production";
const envConfig = configs[environment];
const db = knex(envConfig);

console.log(`RUNNING: ${name} NODE_ENV=${environment}`);

Promise.all([db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')]);

console.log(`FINISHED: ${name} NODE_ENV=${environment}`);
