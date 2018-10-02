$('.color').click(function () {
  $(this).toggleClass('locked');
})

$('.generate-button').click(function () {
  event.preventDefault();
  console.log('hi');
})

function generateRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var hexId = '#';

  for (var i = 0; i < 6; i++) {
    hexId += letters[Math.round(Math.random * 15)];
  }
  return hexId
} 