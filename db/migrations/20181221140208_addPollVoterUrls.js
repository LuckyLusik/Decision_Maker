exports.up = function(knex, Promise) {
   return knex.schema.table('poll_voter', function (table) {
    table.string('idUrl');
    table.string('shortUrl');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('poll_voter', function (table) {
    table.dropColumn('idUrl');
    table.dropColumn('shortUrl');
  });
};
