const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.get('/', (request, response) => {
  response.send('Root message!');
});

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;

  response.json({ projects })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});

app.locals.projects = [
  { name: 'proj', colors: ['C0C0C0', 'FFFFFF', '808080', '000000', 'FF5723'] },
  { name: 'projTwo', colors: ['C0C0C0', 'FFFFFF', '808080', '000000', 'FF5723'] }
]