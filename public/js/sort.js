$(document).on('ready', function() {
    $('.sortable').sortable({
        axis: "y",
        cursor: "move",
        //handle: "._board__handle",
        update: function(event, ui) {
            var data;
            data = $(this).sortable('serialize');
            console.log(data);
            return $.ajax({
                data: data,
                method: 'POST',
                url: '/admin/api/modules/sort',
                complete: function(jqXHR, textStatus) {
                    return console.log(textStatus);
                }
            });
        }
    });
});
