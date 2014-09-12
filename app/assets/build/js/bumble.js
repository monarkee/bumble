
/*
  Show a module's form content when clicked
 */
var Dropdown, bumbleComponent;

$('.form-header').on('click', function(e) {
  var $this;
  e.preventDefault();
  $this = $(this);
  return $this.siblings('.form-content').toggle();
});


/*
  Expand all of the form-content divs when clicked
 */

$('.js-show-fields').on('click', function(e) {
  return e.preventDefault();
});

$('.form-content').toggle();


/*
  Handle adding of new components
 */

bumbleComponent = {
  form: [],
  addComponentBtn: [],
  init: function() {
    this.form = $('.js-component-form');
    this.addComponentBtn = '.js-add-component';
    return this.bindEvents();
  },
  bindEvents: function() {
    bumbleComponent.form.on('click', bumbleComponent.addComponentBtn, function(e) {});
    e.preventDefault();
    return bumbleComponent.hideForm();
  },
  hideForm: function() {
    return bumbleComponent.form.toggleClass('is-hidden');
  }
};

$('.js-delete-post').on('click', function(e) {
  var r;
  r = confirm("Are you sure you want to delete the post?");
  if (r === false) {
    return e.preventDefault();
  }
});

Dropdown = {
  init: function() {
    Dropdown.dropdowns = $('.js-secondary-nav');
    Dropdown.attachEventHandlers();
    return Dropdown.toggleChildMenu($(this));
  }
};
