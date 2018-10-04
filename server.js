const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Palette Picker';

app.locals.projects = [
  { id: 1, name: 'proj' },
  { id: 2, name: 'projTwo' }
]

app.locals.palettes = [
  { id: 1, color: 1, color: 2, color: 3, color: 4, color: 5 },
  { id: 2, color: 1, color: 2, color: 3, color: 4, color: 5 },
  { id: 3, color: 1, color: 2, color: 3, color: 4, color: 5 }

]

app.use(express.static('public'));

// app.get('/api/v1/projects', (request, response) => {
//   const projects = app.locals.projects;
//   response.json({ projects })
// })

app.get('/api/v1/projects/:name', (request, response) => {
  const { name } = request.params;
  const project = app.locals.projects.find(project => project.name === name);
  return response.status(200).json(project);
})

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  app.locals.projects.push(project)
  response.status(201).json({ project });
})

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});
