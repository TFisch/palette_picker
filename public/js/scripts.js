$('.color').click(function () {
  $(this).toggleClass('locked');
})

$('.generate-button').click(function () {
  console.log(generateRandomColor());
  $('.color').each(function () { $(this).css('background-color', generateRandomColor()) });
})

function generateRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var hexId = '#';

  for (var i = 0; i < 6; i++) {
    hexId += letters[Math.round(Math.random() * 15)];
  }
  return hexId
}

$('.color').css('background-color', 'red');

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