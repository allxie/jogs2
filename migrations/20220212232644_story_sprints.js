
exports.up = function(knex) {
    return knex.schema.createTable("story_sprints", function(table) {
          table
            .uuid('id')
            .primary()
            .unique()
            .notNullable()
            .defaultTo(knex.raw("uuid_generate_v4()"));
      
          table
            .uuid('story_id')
            .references('stories.id')
            .unique()
      
        table
            .uuid('sprint_id')
            .references('sprints.id')
        }
      )
};

exports.down = function(knex) {
    return knex.schema.dropTable("story_sprints");
};
