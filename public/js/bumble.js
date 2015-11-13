
/*
  Datetime Picker
 */

(function() {
  var elems;

  $('._datetimefield').datetimepicker({
    format: 'Y-m-d H:i:s'
  });


  /*
    Date Picker
   */


  /*
    Time Picker
   */


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

}).call(this);

//# sourceMappingURL=bumble.js.map
