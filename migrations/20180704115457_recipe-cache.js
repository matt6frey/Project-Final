
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary();
      table.integer('rid');
      table.string('query_id');
      table.string('title');
      table.string('image');
      table.integer('serves');
      table.integer('prep_time');
      table.string('ingredients');
      table.json('steps');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes');
};