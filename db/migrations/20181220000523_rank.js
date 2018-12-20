
exports.up = function(knex, Promise) {
   return knex.schema.createTable('rank', function (table) {
    table.increments('id');
    table.integer('choiceId').references('id').inTable('choice');
    table.integer('value');
  });
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('rank');
};
