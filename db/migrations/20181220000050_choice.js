
exports.up = function(knex, Promise) {
  return knex.schema.createTable('choice', function (table) {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.integer('pollId').references('id').inTable('poll');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('choice');
};
