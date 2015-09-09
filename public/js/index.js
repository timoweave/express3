
$(document).ready(function() {

    var socket = io.connect();
    console.log(socket);
    
    $('#increase_epic_button').click(function () {
        console.log('emit increase_epic_button');
        socket.emit("increase_epic_button");
    });

    $('#reset_epic_button').click(function() {
        console.log('emit reset_epic_button');
        socket.emit("reset_epic_button");
    });

    socket.on("update_epic_button", function(data) {
        console.log('received update_epic_button');        
        console.log(data);
        $('#epic_button_count').text(data.epic_button_count);
    });
    
});
