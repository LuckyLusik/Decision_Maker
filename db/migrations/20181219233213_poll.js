
exports.up = function(knex, Promise) {
  return knex.schema.createTable('poll', function (table) {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.datetime('start_date');
    table.datetime('end_date');
    table.integer('creator_id').references('id').inTable('poll_creator');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('poll');
};
