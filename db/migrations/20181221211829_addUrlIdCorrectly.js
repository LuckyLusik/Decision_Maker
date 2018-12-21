exports.up = function(knex, Promise) {
  return knex.schema.table('poll_voter', function (table) {
  table.string('id_url');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('poll_voter', function (table) {
    table.dropColumn('id_url');
  });
};
