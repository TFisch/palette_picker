const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';
app.locals.projects = [
  { name: 'proj', colors: ['C0C0C0', 'FFFFFF', '808080', '000000', 'FF5723'] },
  { name: 'projTwo', colors: ['C0C0C0', 'FFFFFF', '808080', '000000', 'FF5723'] }
]

app.use(express.static('public'));

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;
  response.json({ projects })
})

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

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});
