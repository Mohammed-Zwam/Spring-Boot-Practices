
var logInElement = document.querySelector('#login');
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm');
var connect = document.querySelector('#connect');
var mainChat = document.querySelector('#main-chat');
var sendDiv = document.querySelector('.send_message');
var main = document.querySelector('#main');
var userName = null;
var stomp = null;
var users = null;
var URL = "http://localhost:8080"
var onlineUsers = document.querySelector('#online-users');
var onlineUsersList = onlineUsers.querySelector('#users');


function connectSocket(event){
    event.preventDefault()
    userName = document.querySelector('#username').value.trim();
    if(userName){
        logInElement.classList.add("dis");
        chatElement.classList.remove("dis");
        onlineUsers.classList.remove("dis");
        var socket = new SockJS(URL + '/websocket'); // same => registry.addEndpoint("/websocket").withSockJS();
        stomp = Stomp.over(socket);
        stomp.connect({},() => {
            stomp.subscribe("/chat-client/messages", sendMessage)
            stomp.subscribe("/chat-client/user-state", changeUserState)
            stomp.send("/chat-server/join",{}, // chat-server => prefix of message broker + @RequestMapping("/chat-server") + @MessageMapping("/join") in controller
                    JSON.stringify(userName)
            )
            connect.classList.add('dis')
        })
    }
}


function sendMessage(payload){
    var res = JSON.parse(payload.body)
    var li = document.createElement('li');
    li.classList.add('sms');
    if (res.sender === userName) li.classList.add('my-sms');

    var image = document.createElement('img');
    image.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
    image.alt = res.sender;

    var messageWrapper = document.createElement('div');
    messageWrapper.classList.add('my-message');

    var userSpan = document.createElement('span');
    userSpan.classList.add('user');
    userSpan.textContent = res.sender;

    var mesSpan = document.createElement('span');
    mesSpan.classList.add('mes');
    mesSpan.textContent = res.messageContent;

    messageWrapper.appendChild(userSpan);
    messageWrapper.appendChild(mesSpan);

    li.appendChild(image);
    li.appendChild(messageWrapper);
    mainChat.appendChild(li);

    // Auto-scroll to bottom
    mainChat.scrollTop += mainChat.offsetHeight;

}

function changeUserState(payload){
    var res = JSON.parse(payload.body)
    var {username, state} = res;
    console.log(username, state)

    var li = document.createElement('li');
    var hr1 = document.createElement('hr');
    var hr2 = document.createElement('hr');
    var statusDiv = document.createElement('div');
    statusDiv.classList.add('status');
    statusDiv.classList.add(state);
    var emoji = state === 'join' ? '✓' : '✕';
    var statusText = document.createTextNode(emoji + ' ' + username + ' ' + state);
    statusDiv.appendChild(statusText);

    li.appendChild(hr1);
    li.appendChild(statusDiv);
    li.appendChild(hr2);
    mainChat.appendChild(li);


    listActiveUsers()
}

function send(){
console.log("TESSSST ??????? CLICK")
    var userMessage = document.querySelector('#sms').value.trim()
    if(userMessage && stomp){
        var userMessage ={
            messageContent: userMessage,
            sender: userName
        }
        stomp.send("/chat-server/send-message",{},JSON.stringify(userMessage))
        document.querySelector('#sms').value = '';
        document.querySelector('#sms').focus();
        // Auto-scroll to bottom
        mainChat.parentElement.scrollTop = mainChat.parentElement.scrollHeight;
    }
}

function listActiveUsers(){
    fetch(URL + "/api/active-users")
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)
            users = data;
            showActiveUser(users);
        })
        .catch(error => console.error('Error fetching active users:', error));
}

function showActiveUser(users){
    console.log(users)

    // Clear previous list
    var existingTest = document.getElementById('test');
    if(existingTest) {
        existingTest.remove();
    }

    var mainDiv = document.createElement('div');
    mainDiv.classList.add('abso');
    mainDiv.id = 'test';

    for (let z = 0; z < users.length; z++){
        var userItem = document.createElement('div');
        userItem.classList.add('user-item');

        var nameSpan = document.createElement('span');
        nameSpan.classList.add('name-us');
        nameSpan.textContent = users[z].username;
        nameSpan.title = users[z].username; // Tooltip for long names

        var statusWrapper = document.createElement('span');
        statusWrapper.classList.add('status-indicator');

        var statusIcon = document.createElement('i');
        statusIcon.classList.add('fas', 'fa-circle');

        statusWrapper.appendChild(statusIcon);

        userItem.appendChild(nameSpan);
        userItem.appendChild(statusWrapper);
        mainDiv.appendChild(userItem);
    }

    onlineUsersList.appendChild(mainDiv)
}

userForm.addEventListener('submit', connectSocket)
sendDiv.addEventListener('click',send)

var smsInput = document.querySelector('#sms');
if(smsInput) {
    smsInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    });
}
