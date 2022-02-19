
exports.up = function(knex) {
  return knex.schema.createTable("sprints", function(table) {
        table.uuid('id').primary().unique().notNullable().defaultTo(knex.raw("uuid_generate_v4()"));
        table.string('name').notNullable()
        table.timestamp("starts_at").notNullable().defaultTo(knex.raw("now()"));
        table.timestamp("ends_at").notNullable().defaultTo(knex.raw("now()"));
        table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
        table.timestamp("updated_at").notNullable().defaultTo(knex.raw("now()"));
        table.timestamp("deleted_at");
      }
    )
};

exports.down = function(knex) {
    return knex.schema.dropTable("sprints");
};
