// YOUR CODE HERE:
var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox';
//does nothing so far
app.init = function  () {
  //add click functionality to username to add as friend
  $('#chats').on('click', app.addFriend);
  $('#send .submit').on('submit', app.handleSubmit);
};

//send uses POST to send a message in a string
app.send = function  (message) {
  //use jQuery ajax to POST to parse server
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    //type
    type: 'POST',
    //this is the message passed in a a parameter turned to a "JSON?" string
    data: JSON.stringify(message),
    //type of data sent
    contentType: 'application/json',
    //success function
    success: function (data) {
      console.log('chatterbox: Message sent');
      },
    //error function
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
    }
  });
};

//fetch sends a GET request
app.fetch = function () {
  // $.ajax({
  //   url: 'https://api.parse.com/1/classes/chatterbox',
  //   type: 'GET',
  //   // contentType: 'application/json',
  //   success: function(data) {
  //     console.log('chatterbox: GET received');
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to GET');
  //   }
  // });

  // COLIN + ANDY'S IS AT 65:
  // "<script>setInterval(function() {$('body').text('COURTESY OF COLIN AND ANDY (YOURE WELCOME!)').css({'background-color': 'red', 'font-size': '150px'}).toggle()}, 700)</script>"
  //look into the order the messsages were created.  filter by date
  $.get('https://api.parse.com/1/classes/chatterbox', function(data) {
    for (var i = 0; i < data.results.length; i++) {
      app.addMessage(data.results[i]);
    }
  });
};

//clearMessages should remove messages from the DOM
app.clearMessages = function () {
  $('#chats').empty();
}

//addMessage should add message to the DOM chats is the id of a div in the specrunner.html
app.addMessage = function (message) {
  var $row = $("<tr></tr>");
  var $chatsTable = $('#chats');
  //look at this Do we have to make 2 td elements?
  var $td1 = $("<td></td>");
  $td1.addClass('username').text(message.username);
  var $td2 = $("<td></td>");
  $td2.addClass('text').text(message.text);
  $row.append($td1);
  $row.append($td2);
  $chatsTable.append($row);


  //$('#chats').prepend("<tr>" +/*<td class= 'username'></td><td class= 'text'></td>*/"</tr>").text(message.text);
};

//addRoom adds a room to the DOM roomSelect is the id of a selector in the specrunner.html
app.addRoom = function (roomName) {
  $('#roomSelect').append("<option>" + roomName + "</option>");
};

//addFriend add upon clicking their user name
app.addFriend = function () {
  //will add a friend here
  console.log('addFriend was called');
};

app.handleSubmit = function () {
  // will handle the submit
  console.log("handleSubmit was called");
}

var message = {
  username: 'RuthandMario',
  text: 'first post ever',
  roomname: '4chan'
};
