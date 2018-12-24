exports.up = function(knex, Promise) {
  return knex.schema.table('poll', function (table) {
  table.boolean('name_verfy').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('poll', function (table) {
    table.dropColumn('name_verify');
  });
};