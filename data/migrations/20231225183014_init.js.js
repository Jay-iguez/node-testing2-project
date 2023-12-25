/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
        .createTable('offices', table => {
            table.increments('office_id')
            table.string('office_name')
                .notNullable()
                .defaultTo('Woof Industries')
            table.string('office_height')
                .defaultTo('10 stories')
        })
        .createTable('dogs', table => {
            table.increments('dog_id')
            table.string('dog_name')
                .notNullable()
                .defaultTo('Rush')
            table.string('dog_breed')
                .notNullable()
                .defaultTo('Husky')
            table.integer('dog_lbs')
                .notNullable()
                .defaultTo(80)
            table.boolean('dog_sheds')
                .notNullable()
                .defaultTo(true)
            table.integer('office_id')
                .unsigned()
                .notNullable()
                .references('office_id')
                .inTable('offices')
                .defaultTo(1)
                .onDelete('RESTRICT')
                .onUpdate('RESTRICT')
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('dogs')
    .dropTableIfExists('offices')
};
