
exports.up = function(knex, Promise) {
   return knex.schema.table('rank', function (table) {
    table.integer('voter_id').references('id').inTable('poll_voter');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('rank', function (table) {
    table.dropColumn('voter_id');
  });
};
