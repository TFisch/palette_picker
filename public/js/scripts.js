fetchProjects = async () => {
  try {
    const url = "/api/v1/projects";
    const response = await fetch(url);
    const data = await response.json();
    populateProjectMenu(data);
    populateProjectList(data);
  } catch (error) {
    console.log(error);
  }
}

retrieveSavedPalettes = async () => {
  try {
    const url = "/api/v1/palettes";
    const response = await fetch(url);
    const data = await response.json();
    const match = data.map(palette => ($(`#proj${palette.project_id}`)).append(`
  <li class="palette" id=${palette.id}>
    <h4 class="palette-name">${palette.name}</h4>
    <span class="block-wrap">
      <div class="color-block" style="background-color:${palette.color_1}"></div>
      <div class="color-block" style="background-color:${palette.color_2}"></div>
      <div class="color-block" style="background-color:${palette.color_3}"></div>
      <div class="color-block" style="background-color:${palette.color_4}"></div>
      <div class="color-block" style="background-color:${palette.color_5}"></div>
      <img class="delete-palette" src="../images/garbage.svg" />
    </span>
  </li>
  `));
  } catch (error) {
    console.log(error);
  }
}

populateProjectMenu = (retreivedProjects) => {
  retreivedProjects.map(project => {
    return $(".project-menu").append(`
      <li class="stack project-item">${project.name}</li>
      `);
  })
}

populateProjectList = (retreivedProjects) => {
  retreivedProjects.map(project => {
    return $(".project-display").append(`
      <ul class="project-index" id=${"proj" + project.id}>
        <h4 class="project-name">${project.name}</h4>
      </ul>
      `);
  })
}

displayNewProject = async (id) => {
  try {
    const idValue = Object.values(id);
    const url = `/api/v1/projects/${idValue}`;
    const response = await fetch(url);
    const data = await response.json();
    populateProjectList(data);
    populateProjectMenu(data);
  } catch (error) {
    console.log(error);
  }
}

checkProjectName = async (entry) => {
  try {
    const url = "/api/v1/projects";
    const response = await fetch(url);
    const data = await response.json();
    const match = data.find(project => entry === project.name);
    if (match) {
      console.log("Sorry that project name is taken")
    } else {
      addProject(entry);
    }
  } catch (error) {
    console.log(error);
  }
}

addProject = async (entry) => {
  try {
    const url = "/api/v1/projects";
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ name: entry }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    await displayNewProject(data);
  } catch (error) {
    console.log(error);
  }
}

deletePalette = async (palette) => {
  try {
    paletteId = palette[0].id;
    const url = `/api/v1/palettes/${paletteId}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    const data = await response.json();
    palette[0].remove();
  } catch (error) {
    console.log(error);
  }
}

generateRandomColor = () => {
  var letters = '0123456789ABCDEF'.split('');
  var hexId = '#';

  for (var i = 0; i < 6; i++) {
    hexId += letters[Math.round(Math.random() * 15)];
  }
  return hexId
}

postPalette = async (
  colorOne,
  colorTwo,
  colorThree,
  colorFour,
  colorFive,
  name,
  projectId) => {
  try {
    const url = "/api/v1/palettes";
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ name: name, color_1: colorOne, color_2: colorTwo, color_3: colorThree, color_4: colorFour, color_5: colorFive, project_id: projectId }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
  } catch (error) {
    console.log(error);
  }
}

findProjectMatch = async () => {
  try {
    const selectedProject = $('.dropdown-top').text();
    const url = "/api/v1/projects";
    const response = await fetch(url);
    const data = await response.json();
    const match = data.find(project => selectedProject === project.name);
    return match
  } catch (error) {
    console.log(error);
  }
}

$(document).ready(function () {
  fetchProjects();
  retrieveSavedPalettes();
  $('.color').each(function () { $(this).css('background-color', generateRandomColor()) });
});

$(window).on('load', function () {
  $('.delete-palette').click(function (event) {
    const palette = ($(event.target).parent().parent());
    deletePalette(palette);
  })
});

$('.color').click(function (event) {
  let imageState = ($(event.target).children('img').attr('src'));
  if (imageState === "./images/unlocked.svg") {
    ($(event.target).children('img').attr('src', './images/locked.svg'));
    ($(event.target).toggleClass('unlocked'));
    ($(event.target).toggleClass('locked-in'));

  }
  if (imageState === "./images/locked.svg") {
    ($(event.target).children('img').attr('src', './images/unlocked.svg'));
    ($(event.target).toggleClass('unlocked'));
    ($(event.target).toggleClass('locked-in'));
  }
})

$('#save-palette-button').click(async function () {
  const colorOne = $('.color-one').css('background-color');
  const colorTwo = $('.color-two').css('background-color');
  const colorThree = $('.color-three').css('background-color');
  const colorFour = $('.color-four').css('background-color');
  const colorFive = $('.color-five').css('background-color');
  const name = $('.palette-input').val();
  const resolvedMatch = await findProjectMatch();
  const projectId = resolvedMatch.id;
  postPalette(colorOne, colorTwo, colorThree, colorFour, colorFive, name, projectId);
})

$('.project-menu').click(function (e) {
  event.preventDefault();
  const selection = e.target.innerText;
  $('.dropdown-top').text(selection);
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

  $('.lock-image').click(function (e) {
    let imageState = $(event.target).attr('src');
    if (imageState === "./images/unlocked.svg") {
      ($(event.target).attr('src', './images/locked.svg'));
      ($(event.target).parent('div').toggleClass('unlocked'));
      ($(event.target).parent('div').toggleClass('locked-in'));

    }
    if (imageState === "./images/locked.svg") {
      ($(event.target).attr('src', './images/unlocked.svg'));
      ($(event.target).parent('div').toggleClass('unlocked'));
      ($(event.target).parent('div').toggleClass('locked-in'));
    }

  })

  $('.generate-button').click(function () {
    $('.unlocked').each(function () { $(this).css('background-color', generateRandomColor()) });
  })
});