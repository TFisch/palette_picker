exports.seed = function (knex, Promise) {
  return knex('palettes').del()
    .then(() => knex('projects').del())

    .then(() => {
      return Promise.all([

        knex('projects').insert({
          name: 'humble beginnings',
        }, 'id')
          .then(paper => {
            return knex('palettes').insert([
              { color_1: '#E22321', color_2: '#C342222', color_3: '#FFFFFF', color_4: '#B23433', color_5: '#000000', project_id: 1 },
              { color_1: '#E22321', color_2: '#C342222', color_3: '#FFFFFF', color_4: '#B23433', color_5: '#000000', project_id: 1 }
            ])
          })
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};