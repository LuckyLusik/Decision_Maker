
exports.up = function(knex, Promise) {
  return knex.schema.createTable('poll', function (table) {
    table.increments('id');
    table.string('title');
    table.string('description');
    table.datetime('startDate');
    table.datetime('endDate');
    table.integer('creatorId').references('id').inTable('pollCreator');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('poll');
};
