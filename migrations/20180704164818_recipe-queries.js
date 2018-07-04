exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipe_queries', (table) => {
    table.increments('id').primary();
      table.string('query_str');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes_queries');
};