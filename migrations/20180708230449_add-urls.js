
exports.up = function(knex, Promise) {
  return knex.schema.table('foods', function (table) {
      table.text('url', 'LONGTEXT');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('foods', function (table) {
      table.dropColumn('url');
    });
};
