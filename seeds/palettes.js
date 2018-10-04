const palleteDataTwo = {
  name: 'humble beginnings',
  color_1: '#E22321',
  color_2: '#C342222',
  color_3: '#FFFFFF',
  color_4: '#B23433',
  color_5: '#000000',
  project_id: 1
};

const paletteDataOne = {
  name: 'morning of destruction',
  color_1: '#E22321',
  color_2: '#C342222',
  color_3: '#FFFFFF',
  color_4: '#B23433',
  color_5: '#000000',
  project_id: 1
};

const paletteDataThree = {
  name: 'Obedient Oppossum',
  color_1: '#E22321',
  color_2: '#C342222',
  color_3: '#FFFFFF',
  color_4: '#B23433',
  color_5: '#000000',
  project_id: 1
};

let projectData = [
  { name: 'Project One', palettes: [paletteDataOne] },
  { name: 'Project Two', palettes: [palleteDataTwo, paletteDataThree] }
]

const createProject = (knex, project) => {
  return knex('projects').insert({
    name: project.name,
  }, 'id')
    .then(projectId => {
      let palettePromises = [];

      project.palettes.forEach(palette => {
        palettePromises.push(
          createPalette(knex, {
            name: palette.name,
            color_1: palette.color_1,
            color_2: palette.color_2,
            color_3: palette.color_3,
            color_4: palette.color_4,
            color_5: palette.color_5,
            project_id: projectId[0]
          })
        )
      });

      return Promise.all(palettePromises);
    })
};

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
};

exports.seed = (knex, Promise) => {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = [];

      projectData.forEach(project => {
        projectPromises.push(createProject(knex, project));
      });

      return Promise.all(projectPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};