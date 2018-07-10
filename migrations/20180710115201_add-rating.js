
exports.up = function(knex, Promise) {
  return knex.schema.table('recipes', function (table) {
      table.string('rating');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('recipes', function (table) {
      table.dropColumn('rating');
    });
};
