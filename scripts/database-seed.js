import configs from "../knexfile";
import knex from "knex";

const name = `database-seed.js`;
const environment =
  process.env.NODE_ENV !== "production" ? "development" : "production";
const envConfig = configs[environment];
const db = knex(envConfig);

console.log(`RUNNING: ${name} NODE_ENV=${environment}`);

// --------------------------
// SCRIPTS
// --------------------------

const createUserTable = db.schema.createTable("users", function(table) {
  table
    .uuid("id")
    .primary()
    .unique()
    .notNullable()
    .defaultTo(db.raw("uuid_generate_v4()"));

  table
    .timestamp("created_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table
    .timestamp("updated_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table
    .string("email")
    .unique()
    .notNullable();

  table.string("password").nullable();
  table.string("salt").nullable();
  table.jsonb("data").nullable();
});

// --------------------------
// RUN
// --------------------------
Promise.all([
  createUserTable
]);

console.log(`FINISHED: ${name} NODE_ENV=${environment} (⌘ + C to quit)`);
