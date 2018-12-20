
exports.up = function(knex, Promise) {
  return knex.schema.createTable('poll_creator', function (table) {
    table.increments('id');
    table.string('name');
    table.string('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('poll_creator');
}
