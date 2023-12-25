/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('dogs').truncate()
  await knex('dogs').insert([
    {dog_name: 'Ordell', dog_breed: 'German Shepherd', dog_lbs: 110, dog_sheds: true, office_id: 2},
    {dog_name: 'Polo', dog_breed: 'Mutt', dog_lbs: 60, dog_sheds: true, office_id: 1},
    {dog_name: 'Cookie', dog_breed: 'Boxer', dog_lbs: 80, dog_sheds: false, office_id: 2},
    {dog_name: 'Mason', dog_breed: 'Labrador Retriever', dog_lbs: 90, dog_sheds: false, office_id: 1},
    {dog_name: 'Kale', dog_breed: 'Mutt', dog_lbs: 80, dog_sheds: true, office_id: 1},
    {dog_name: 'Sessie', dog_breed: 'Mutt', dog_lbs: 80, dog_sheds: true, office_id: 3},
    {dog_name: 'Sam', dog_breed: 'Akita', dog_lbs: 70, dog_sheds: false, office_id: 3}
  ]);
};
