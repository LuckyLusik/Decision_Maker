exports.up = function(knex, Promise) {
  return knex.schema.table('poll', function (table) {
  table.string('short_url');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('poll', function (table) {
    table.dropColumn('short_url');
  });
};
