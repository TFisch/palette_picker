//Checking the set node environment, default to development
const environment = process.env.NODE_ENV || 'development';
//Configuring the knex environment
const configuration = require('./knexfile')[environment];
//Configuring the knex database
const database = require('knex')(configuration);
//Bringing in the express library
const express = require('express');
//Giving access to all the methods in express library
const app = express();
//Giving access to bodyParser npm
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//Setting the active port to whatever is specified in node environment, default to 3000
app.set('port', process.env.PORT || 3000);

//Telling express to serve static files in the public directory 
app.use(express.static('public'));

//make a get request to the palette endpoint
app.get('/api/v1/palettes', (request, response) => {
  //select the palette database
  database('palettes').select()
    //then, respond with palettes at corresponding end point. status 200 = success.
    .then((palettes) => {
      response.status(200).json(palettes);
    })
    //catch any problems, status 500 = server side error
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//Make a get request to the palettes table using a specified id param
app.get('/api/v1/palettes/:id', (request, response) => {
  //find row in database that matches specified param
  database('palettes').where('id', request.params.id).select()
    //if successful, respond with matching palettes
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes);
        //if not, displat an error that specifies could not be found
      } else {
        //error status 404 if passed in params doesn't match
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        });
      }
    })
    //Handle server side errors
    .catch(error => {
      response.status(500).json({ error });
    });
});

//Send get request to projects endpoint
app.get('/api/v1/projects', (request, response) => {
  //Select all contents of projects tables
  database('projects').select()
    //If successful return projects object with status 200
    .then((projects) => {
      response.status(200).json(projects);
    })
    // if unsucessful return server side error
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//send get request with specified id as parameter
app.get('/api/v1/projects/:id', (request, response) => {
  //Find row with matching id
  database('projects').where('id', request.params.id).select()
    //if successful, returing matching projects object
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        //error status 404 if there isn't a matching project
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        });
      }
    })
    //handle server side error
    .catch(error => {
      response.status(500).json({ error });
    });
});

//make a post request to projects endpoint
app.post('/api/v1/projects', (request, response) => {
  //assign project to value of request object
  const project = request.body;

  //set requiredparameter of name on project
  for (let requiredParameter of ['name']) {
    //if there isnt a name parameter
    if (!project[requiredParameter]) {
      //return a 422 errorm specifying missing parameter
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }
  //insert project into projects database
  database('projects').insert(project, 'id')
    //if successful, return object with specified id
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    //handle server side error
    .catch(error => {
      response.status(500).json({ error });
    });
});
//make POST request to palettes endpoint
app.post('/api/v1/palettes', (request, response) => {
  //assign request object to palette varible
  const palette = request.body;

  //set required parameters for palette object
  for (let requiredParameter of ['color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'name', 'project_id']) {
    // if there is a missing parameter
    if (!palette[requiredParameter]) {
      //respond with error of missing property
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }
  //insert palette into palettes database
  database('palettes').insert(palette, 'id')
    //respond with palette id value
    .then(palette => {
      response.status(201).json({ id: palette[0] })
    })
    //handle server side error
    .catch(error => {
      response.status(500).json({ error });
    });
});

//send 
app.delete('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where({ id: request.params.id }).del()
    .then(response => {
      response.status(201).json({ id })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`);
});
