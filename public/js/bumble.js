
/*
  Datetime Picker
 */
var MediaBrowser, btnsGrps, elems;

$('._datetimefield').datetimepicker({
  format: 'Y-m-d H:i:s'
});


/*
  Date Picker
 */

$('._datefield').datetimepicker({
  timepicker: false,
  format: 'Y-m-d'
});


/*
  Time Picker
 */

$('._timefield').datetimepicker({
  datepicker: false,
  format: 'H:i:s'
});


/*
  Handle messages
 */

$('.js-hide-message').delay(7000).fadeOut(1000);

$('.js-close-message').on('click', function(e) {
  console.log('Hiding the message');
  return $(this).closest('.js-message').hide();
});

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


/*
  Select the first tab in the list
 */

$('.tab-header').first().addClass('tab-header__active');

$('.tab').hide().first().show();


/*
  Set up WYSIWYG fields
 */

btnsGrps = jQuery.trumbowyg.btnsGrps;

$('._wysiwyg').trumbowyg({
  autogrow: true,
  btns: ['viewHTML', btnsGrps.design, 'link', 'insertImage', btnsGrps.justify, btnsGrps.lists, 'insertHorizontalRule']
});


/*
  Handle Dropdown Menus
 */

$('._dropdown').on('click', function(e) {
  var $dropdown, $target;
  e.preventDefault();
  $dropdown = $(this);
  $target = $('#' + $dropdown.data('dropdownTarget'));
  $target.toggleClass('is-visible');
  return e.stopPropagation();
});


/*
  Handle Clicks Outside of the Dropdown Menu
 */

$(document).on('click', function(e) {
  return $('._dropdown-menu').removeClass("is-visible");
});


/*
  BooleanField Toggles
 */

elems = Array.prototype.slice.call(document.querySelectorAll('._switch'));

elems.forEach(function(html) {
  var switchery;
  return switchery = new Switchery(html, {
    secondaryColor: "#DB5554"
  });
});


/*
  Tooltips
 */

$('._tooltip').tipr();


/*
  MarkdownField
 */

$('._markdown-field').each(function() {
  var editor;
  editor = mirrorMark(this, {
    showToolbar: true
  });
  return editor.render();
});


/*
  Show Media Browser
 */

MediaBrowser = {
  $assets: '',
  $asset: '',
  $modal: '',
  $openBtn: '',
  $closeBtn: '',
  copyBtns: '',
  width: '',
  height: '',
  crop: '',
  init: function() {
    this.$assets = $('.assets');
    this.$asset = $('.asset');
    this.$modal = $('.modal');
    this.$openBtn = $('._media-browser-open');
    this.$closeBtn = $('._media-browser-close');
    this.copyBtns = '._send-to-editor';
    this.width = '._width';
    this.height = '._height';
    this.crop = '._crop';
    this.bindEvents();
  },
  bindEvents: function() {
    this.$openBtn.on('click', function(e) {
      e.preventDefault();
      MediaBrowser.openModal();
    });
    this.$closeBtn.on('click', function(e) {
      e.preventDefault();
      MediaBrowser.closeModal();
    });
    this.$modal.on('click', function(e) {});
    $('.modal__bg').on('click', function(e) {
      MediaBrowser.closeModal();
    });
    this.$asset.on('input', MediaBrowser.width, function(e) {
      MediaBrowser.setInputValue($(e.delegateTarget));
    });
    this.$asset.on('input', MediaBrowser.height, function(e) {
      MediaBrowser.setInputValue($(e.delegateTarget));
    });
    this.$asset.on('click', MediaBrowser.crop, function(e) {
      MediaBrowser.setInputValue($(e.delegateTarget));
    });
    this.$asset.on('click', this.copyBtns, function(e) {
      var $delegate, output;
      e.preventDefault();
      $delegate = $(e.delegateTarget);
      MediaBrowser.setInputValue($delegate);
      output = MediaBrowser.getCopyValue($delegate);
      MediaBrowser.copyToClipboard(MediaBrowser.getInput($delegate));
    });
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        MediaBrowser.closeModal();
      }
    });
  },
  openModal: function() {
    $('body').css('overflow', 'hidden');
    MediaBrowser.$modal.show();
  },
  closeModal: function() {
    $('body').css('overflow', '');
    MediaBrowser.$modal.hide();
  },
  updateInput: function($input) {},
  setInputValue: function($delegate) {
    var $input, orginalInputValue, params;
    orginalInputValue = MediaBrowser.getOriginalInputValue($delegate);
    params = MediaBrowser.getParamString($delegate);
    $input = MediaBrowser.getInput($delegate);
    $input.val('<img src="' + orginalInputValue + params + '">');
  },
  getParamString: function($delegate) {
    var crop, cropValue, height, options, params, width;
    options = '.options';
    width = $delegate.children(options).children(MediaBrowser.width).eq(0).val();
    height = $delegate.children(options).children(MediaBrowser.height).eq(0).val();
    crop = $delegate.children(options).children(MediaBrowser.crop).eq(0).is(':checked');
    cropValue = '0';
    params = {
      w: width,
      h: height
    };
    if (crop === true) {
      cropValue = '1';
      params.c = cropValue;
    }
    return '?' + $.param(params);
  },
  getCopyValue: function($delegate) {
    var $input;
    $input = MediaBrowser.getInput($delegate);
    return $input.val();
  },
  getInput: function($delegate) {
    return $delegate.children('._input-value');
  },
  getOriginalInputValue: function($delegate) {
    var $input;
    $input = MediaBrowser.getInput($delegate);
    return $input.attr('data-original-value');
  },
  copyToClipboard: function(input) {
    input.select();
  }
};

MediaBrowser.init();
