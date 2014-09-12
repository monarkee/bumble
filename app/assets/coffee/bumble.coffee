###
  Show a module's form content when clicked
###
$('.form-header').on 'click', (e) ->
  e.preventDefault()
  $this = $(this)
  $this.siblings('.form-content').toggle()

###
  Expand all of the form-content divs when clicked
###
$('.js-show-fields').on 'click', (e) ->
  e.preventDefault()
$('.form-content').toggle()


###
  Handle adding of new components
###
bumbleComponent =
  form: []
  addComponentBtn: []

  init: () ->
    # Selectors
    this.form = $('.js-component-form')
    this.addComponentBtn = '.js-add-component'

    # Bind all of the event handlers
    this.bindEvents()

  bindEvents: () ->
    # Component Form Event Delegator
    bumbleComponent.form.on 'click', bumbleComponent.addComponentBtn, (e) ->
    e.preventDefault()
    bumbleComponent.hideForm()

  hideForm: () ->
    bumbleComponent.form.toggleClass('is-hidden')

#bumbleComponent.init()


# Handle delete buttons on posts index page
$('.js-delete-post').on 'click', (e) ->
  # Make sure the user wants to delete the post.
  r = confirm("Are you sure you want to delete the post?")

  if (r == false)
    e.preventDefault()

# This is the dropdown
Dropdown =
  init: () ->
    Dropdown.dropdowns = $('.js-secondary-nav')
    Dropdown.attachEventHandlers()

  attachEventHandlers: () ->
    Dropdown.dropdowns.on('click', (event) ->
      event.preventDefault()
      event.stopPropagation()
      Dropdown.toggleChildMenu($(this))

    # Make the menu go away when you click
#    $('html').on 'click', () ->
#      Dropdown.hideAllMenus()

#  toggleChildMenu: ($parent) ->
#    $parent.siblings('ul.secondary-nav').toggleClass('is-visible')
#
#  hideAllMenus: () ->
#    $('ul.secondary-nav').removeClass('is-visible')
#
#Dropdown.init()
