
async function fetchProjects() {
  const url = "/api/v1/projects";
  const response = await fetch(url);
  const data = await response.json();
  await populateProjectMenu(data);
  await populateProjectList(data);

}

function populateProjectMenu(retreivedProjects) {
  retreivedProjects.map(project => {
    return $(".project-menu").append(`<li class="stack">${project.name}</li>`);
  })
}

function populateProjectList(retreivedProjects) {
  console.log(retreivedProjects);
  retreivedProjects.map(project => {
    return $(".project-display").append(`<ul class="stack">${project.name}</ul>`);
  })
}

async function displayNewProject(id) {
  const idValue = Object.values(id);
  const url = `/api/v1/projects/${idValue}`;
  const response = await fetch(url);
  const data = await response.json();
  populateProjectList(data);
  populateProjectMenu(data);
}


async function checkProjectName(entry) {
  const url = "/api/v1/projects";
  const response = await fetch(url);
  const data = await response.json();
  console.log(entry);
  const match = data.find(project => entry === project.name);
  if (match) {
    console.log("Sorry that project name is taken")
  } else {
    addProject(entry);
  }
}

async function addProject(entry) {
  const url = "/api/v1/projects";
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ name: entry }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  await displayNewProject(data);
}


function generateRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var hexId = '#';

  for (var i = 0; i < 6; i++) {
    hexId += letters[Math.round(Math.random() * 15)];
  }
  return hexId
}

$(document).ready(function () {
  fetchProjects();
  $('.color').each(function () { $(this).css('background-color', generateRandomColor()) });
});

$('.color').click(function () {
  $(this).toggleClass('locked');
})

$('.generate-button').click(function () {
  $('.color').each(function () { $(this).css('background-color', generateRandomColor()) });
})

$('.save-palette').click(function () {
  event.preventDefault();
  const entry = $('.palette-input').val();
})

$('.save-project').click(function () {
  event.preventDefault();
  const entry = $('.project-input').val();
  checkProjectName(entry);
})

$(function () {
  $('.dropdown-top').click(function () {
    $(this).next('.project-menu').toggle();
  });

  $(document).click(function (e) {
    var target = e.target;
    if (!$(target).is('.dropdown-top') && !$(target).parents().is('.dropdown-top')) {
      $('.project-menu').hide();
    }
  });
});