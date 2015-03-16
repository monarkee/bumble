###
  Datetime Picker
###
$('._datetimefield').datetimepicker({
  format: 'Y-m-d H:i:s'
});

###
  Date Picker
###
$('._datefield').datetimepicker({
  timepicker: false,
  format: 'Y-m-d'
});

###
  Time Picker
###
$('._timefield').datetimepicker({
  datepicker: false,
  format: 'H:i:s'
});

###
  Handle messages
###
$('.js-hide-message').delay(7000).fadeOut(1000);

$('.js-close-message').on 'click', (e) ->
  console.log 'Hiding the message'
  $(this).closest('.js-message').hide()

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

###
  Select the first tab in the list
###
$('.tab-header').first().addClass('tab-header__active')
$('.tab').hide().first().show()


###
  Set up WYSIWYG fields
###
btnsGrps = jQuery.trumbowyg.btnsGrps

$('._wysiwyg').trumbowyg({
  autogrow: true,
  btns: ['viewHTML',
         btnsGrps.design,
         'link',
         'insertImage',
         btnsGrps.justify,
         btnsGrps.lists,
         'insertHorizontalRule']
#  fullscreenable: false,
#  closable: true,
#  btns: ['bold', 'italic', '|', 'insertImage']
});


###
  Handle Dropdown Menus
###
$('._dropdown').on 'click', (e) ->
  e.preventDefault()
  $dropdown = $(this)

  $target = $('#' + $dropdown.data('dropdownTarget'))

  $target.toggleClass('is-visible')

  e.stopPropagation()

###
  Handle Clicks Outside of the Dropdown Menu
###
$(document).on 'click', (e) ->
    $('._dropdown-menu').removeClass("is-visible")

###
  BooleanField Toggles
###
elems = Array.prototype.slice.call(document.querySelectorAll('._switch'));

elems.forEach (html) ->
  switchery = new Switchery html,
    secondaryColor: "#DB5554"

###
  Tooltips
###

$('._tooltip').tipr();

###
  MarkdownField
###
$('._markdown-field').each () ->
  editor = mirrorMark this,
    showToolbar: true
  editor.render()


###
  Show Media Browser
###

MediaBrowser =
  $assets: ''
  $asset: ''
  $modal: ''
  $openBtn: ''
  $closeBtn: ''
  copyBtns: ''
  width: ''
  height: ''
  crop: ''
  init: ->
    @$assets = $('.assets')
    @$asset = $('.asset')
    @$modal = $('.modal')
    @$openBtn = $('._media-browser-open')
    @$closeBtn = $('._media-browser-close')
    @copyBtns = '._send-to-editor'
    @width = '._width'
    @height = '._height'
    @crop = '._crop'
    @bindEvents()
    return
  bindEvents: ->
    # Open the modal
    @$openBtn.on 'click', (e) ->
      e.preventDefault()
      MediaBrowser.openModal()
      return

    # Close the modal
    @$closeBtn.on 'click', (e) ->
      e.preventDefault()
      MediaBrowser.closeModal()
      return

    # Hide the modal if click outside
    @$modal.on 'click', (e) ->
#      e.stopPropagation()
      return

    # Close the modal on click outside
    $('.modal__bg').on 'click', (e) ->
      MediaBrowser.closeModal()
      return

#    $(document).on 'click', (e) ->
#      @$modal.hide()
#      return

    @$asset.on 'input', MediaBrowser.width, (e) ->
      MediaBrowser.setInputValue $(e.delegateTarget)
      return
    @$asset.on 'input', MediaBrowser.height, (e) ->
      MediaBrowser.setInputValue $(e.delegateTarget)
      return
    @$asset.on 'click', MediaBrowser.crop, (e) ->
      MediaBrowser.setInputValue $(e.delegateTarget)
      return
    # Copy Button
    @$asset.on 'click', @copyBtns, (e) ->
      e.preventDefault()
      $delegate = $(e.delegateTarget)
      MediaBrowser.setInputValue $delegate
      output = MediaBrowser.getCopyValue($delegate)
      MediaBrowser.copyToClipboard MediaBrowser.getInput($delegate)
      return
    # Close the modal if ESC is pressed
    $(document).keyup (e) ->
      if e.keyCode == 27
        MediaBrowser.closeModal()
      return
    return
  openModal: ->
    $('body').css 'overflow', 'hidden'
    MediaBrowser.$modal.show()
    return
  closeModal: ->
    $('body').css 'overflow', ''
    MediaBrowser.$modal.hide()
    return
  updateInput: ($input) ->
  setInputValue: ($delegate) ->
    orginalInputValue = MediaBrowser.getOriginalInputValue($delegate)
    params = MediaBrowser.getParamString($delegate)
    $input = MediaBrowser.getInput($delegate)
    $input.val '<img src="' + orginalInputValue + params + '">'
    return
  getParamString: ($delegate) ->
    options = '.options'
    width = $delegate.children(options).children(MediaBrowser.width).eq(0).val()
    height = $delegate.children(options).children(MediaBrowser.height).eq(0).val()
    crop = $delegate.children(options).children(MediaBrowser.crop).eq(0).is(':checked')
    cropValue = '0'
    params =
      w: width
      h: height
    # If we're cropping push that parameter
    if crop == true
      cropValue = '1'
      params.c = cropValue
    '?' + $.param(params)
  getCopyValue: ($delegate) ->
    $input = MediaBrowser.getInput($delegate)
    $input.val()
  getInput: ($delegate) ->
    $delegate.children '._input-value'
  getOriginalInputValue: ($delegate) ->
    $input = MediaBrowser.getInput($delegate)
    $input.attr 'data-original-value'
  copyToClipboard: (input) ->
    input.select()
#    window.prompt 'Copy to clipboard: Ctrl+C, Enter', text
    return
MediaBrowser.init()
