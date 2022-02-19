
exports.up = function(knex) {
  return knex.schema.createTable('stories', function(table) {
      table.uuid('id').primary().unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('title');
      table.text('description');
      table.integer('value');
      table.integer('points');
      table.enu('status', ['To Do', 'In Progress', 'Blocked', 'Done', 'Refused']).defaultTo('To Do')
      table.uuid('assignee_id').references('users.id');
      table.uuid('author_id').references('users.id');
      table.timestamp('completed_at');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('deleted_at');
    }
  );
};

exports.down = function(knex) {
  return knex.schema.dropTable('stories');
};
