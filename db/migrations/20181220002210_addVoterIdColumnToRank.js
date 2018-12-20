
exports.up = function(knex, Promise) {
   return knex.schema.table('rank', function (table) {
    table.integer('voterId').references('id').inTable('pollVoter');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('rank', function (table) {
    table.dropColumn('voterId');
  });
};
