$('.js-delete-post').on('click', function(e) {
  var r;
  r = confirm("Are you sure you want to delete the post?");
  if (r === false) {
    return e.preventDefault();
  }
});


/*
  When a user clicks a Tab Header, change the content
 */

$('._tab-header').on('click', function(e) {
  var content, tab;
  e.preventDefault();
  tab = $(this);
  content = tab.data('tabTarget');
  console.log(content);
  $('.tab').hide();
  $("#" + content).show();
  $('.tab-header').removeClass('tab-header__active');
  return $(this).addClass('tab-header__active');
});

$('.tab-header').first().addClass('tab-header__active');

$('.tab').hide().first().show();
