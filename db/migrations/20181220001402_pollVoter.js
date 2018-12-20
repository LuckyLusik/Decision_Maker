
exports.up = function(knex, Promise) {
   return knex.schema.createTable('pollVoter', function (table) {
    table.increments('id');
    table.string('name');
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pollVoter');
};
