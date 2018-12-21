
exports.up = function(knex, Promise) {
  return knex.schema.table('poll_voter', function (table) {
  table.dropColumn('idUrl');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('poll_voter', function (table) {
    table.string('id_url');
  });
};
