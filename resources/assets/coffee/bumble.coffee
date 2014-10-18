# Handle delete buttons on posts index page
$('.js-delete-post').on 'click', (e) ->
  # Make sure the user wants to delete the post.
  r = confirm("Are you sure you want to delete the post?")

  if (r == false)
    e.preventDefault()

###
  When a user clicks a Tab Header, change the content
###
$('._tab-header').on 'click', (e) ->
  e.preventDefault()

  tab = $(this)

  content = tab.data('tabTarget')

  console.log content

  $('.tab').hide()
  $("#" + content).show()

  $('.tab-header').removeClass('tab-header__active')
  $(this).addClass('tab-header__active')


$('.tab-header').first().addClass('tab-header__active')
$('.tab').hide().first().show()
