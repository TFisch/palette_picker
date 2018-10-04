function fetchProjects() {
  const request = $.ajax("http://localhost:3000/api/v1/projects", function (data) {
  });

  request.done(function (data) {
    populateProjectMenu(data);
  })
}

function populateProjectMenu(retreivedProjects) {
  retreivedProjects.map(project => {
    return $(".project-menu").append(`<li class="stack">${project.name}</li>`);
  })
}

function checkProjectName(entry) {
  const request = $.ajax("http://localhost:3000/api/v1/projects", function (data) {
  });

  request.done(function (data) {
    const match = data.find(project => entry === project.name);
    if (match) {
      console.log("Sorry that project name is taken")
    } else {
      addProject(entry);
    }
  })
}

function addProject(entry) {
  $.ajax({
    method: "POST", url: "http://localhost:3000/api/v1/projects", data: { name: entry }, function(data) {
      console.log(data);
    }
  })
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