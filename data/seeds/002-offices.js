/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('offices').truncate()
  await knex('offices').insert([
    {office_name: 'Woof Industries', office_height: '10 stories'},
    {office_name: 'Bark Sparks', office_height: '5 stories'},
    {office_name: 'Sniffing Quarters', office_height: '50 stories'}
  ]);
};
