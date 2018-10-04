
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('palettes', function (table) {
      table.increments('id').primary();
      table.string('color_1');
      table.string('color_2');
      table.string('color_3');
      table.string('color_4');
      table.sting('color_5');
      table.integer('project_id').unsigned()
      table.foreign('project_id')
        .references('projects.id');

    }),

    knex.schema.createTable('projects', function (table) {
      table.increments('id').primary();
      table.string('name');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('projects'),
    knex.schema.dropTable('palettes')
  ]);
};
