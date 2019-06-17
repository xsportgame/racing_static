
var closeCode = 0;
var socket ;
function connect() {
	var registered = false;
	var authorized = false;
	var protocolLoaded = false;
	var calendarLoaded = false;
	var userSessionLoaded = false;
	//var socket = new WebSocket("ws://188.190.223.53:8083/connect");
	dispatchEvent(new Event("ON_USER_CONNECTING"));
	socket = new WebSocket("wss://racing.xsportgame.ru:443/connect");
	socket.onopen = function() {
		console.log('connection established');
		setTimeout(SendMessage, 1, "Main Camera", "ConnectWebSocketsCallback");
	};

	socket.onclose = function(event) {
		if (event.wasClean) {
			console.log('connection closed clean');
		} else {
			console.log('connection interrupted'); // например, "убит" процесс сервера
		}
		closeCode = event.code;
		console.log('Code: ' + event.code + ' Reason: ' + event.reason);
		SendMessage("Main Camera", "SocketErrorCallback", JSON.stringify({"error":'Code: ' + event.code + ' Reason: ' + event.reason}));
	};
	
	socket.onmessage = function(event) {
		try {
			if (socket) {
				console.log(event.data)
				if (!registered || !authorized) {
					var obj = JSON.parse(event.data);
					if (obj.header.code == 200) {
						//console.log(obj);
						if (obj.message == null) {
							dispatchEvent(new Event("ON_USER_REGISTER"));
							authorized = true;
						} else {
							registered = true;
							authorized = true;
							dispatchEvent(new Event("ON_GAME_INITIALIZE_FINISHED"));
						}
					}
					
					if (!registered && obj.header.code == 201 && obj.message.code == 500 ) {
						protocolLoaded = true;
					}
					if (!registered && obj.header.code == 201 && obj.message.code == 509 ) {
						calendarLoaded = true;
					}
					if (!registered && obj.header.code == 201 && obj.message.code == 505 ) {
						userSessionLoaded = true;
					}
					if (!registered && protocolLoaded && calendarLoaded && userSessionLoaded) {
						dispatchEvent(new Event("ON_GAME_INITIALIZE_FINISHED"));
					}
				}
				//console.log(JSON.stringify(event.data))
				//onSocketMessage(JSON.stringify(event.data));
				SendMessage("Main Camera", "SocketMessageCallback", event.data);
			}
		} catch(e){
			console.log("ACHTUNG!!! _-------------------------- socket.onmessage ERROR" + e)
		}
	};

	socket.onerror = function(error) {
		console.log("Error " + error.message);
		SendMessage("Main Camera", "SocketErrorCallback", JSON.stringify(error.message));
	};

}

function sendSocketMessage(message) {
	if ( JSON.parse(message).path == "auth") {
		dispatchEvent(new Event("ON_USER_AUTH"));
	}
	console.log("message sending :" + message + "  socket.readyState " + socket.readyState);
	if (socket.readyState == 1) {
		socket.send(message);
	} else {
		if (closeCode == 1000) {
			connect();
		}
	}
}

