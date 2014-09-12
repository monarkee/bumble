// Delete the module
$('.js-delete-module').on('click', function(e)
{
    e.preventDefault();

    var $this = $(this);
    var moduleId = $this.data('module-id'); // This form
    var actionUrl = $this.data('action-url'); // This URL

    // Send a post request to delete this module
    $.ajax({
        type: "POST",
        url: actionUrl,
        data: {'id': moduleId},
        success: onSuccess,
        dataType: dataType
    });
});

function onDelete() {

}

function onSuccess() {
    alert('It worked!');
}