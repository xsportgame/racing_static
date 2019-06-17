
	var app = getMovie('App');
	var sns;
		
		
	function LOG(message){
		console.log(message);
	}	
	function log(message){
		console.log(message);
	}	
		
		
		var loc = window.location.toString();
		
		if (loc.indexOf("vk.com") != -1){			
				$.getScript("TemplateData/js/social_network/vk.js?data_v="+data_v, function(){
					sns =  new SnsVK();
					sns.initialize();
				});
			
				
		}

	//TODO проверить всё, удалить лишнее

	function getMovie(movieName) {
		return document.getElementById(movieName);
	}	

	// sns methods	

	function order(type, item){
		sns.order(type, item);
	}

	function getUserInfo(){
		sns.getUserInfo();
	}

	function getFriendsInfo(){
		sns.getFriendsInfo();
	}

	var getUsersQuerriesList = [];
	var respondIds = [];
	function getUsersInfo(uids, requestId){
		if (getUsersQuerriesList.length == 0) {
			setTimeout(function (){
				var uidsList = "";
				for (var i = 0;i < getUsersQuerriesList.length; i++) {
					uidsList += ((i == 0)?"":",") + getUsersQuerriesList[i].uid;
				}
				console.log(uidsList);
				sns.getUsersInfo(uidsList);
				getUsersQuerriesList = [];
			}, 1000);
		}
		respondIds.push({uid:uids, requestId:requestId});
		console.log(getUsersQuerriesList)
		getUsersQuerriesList.push({uid:uids});
	}

	function navigateToProfile(uid){
		sns.navigateToProfile(uid);
	}

	// sns method callbacks	

	function getUserInfoCallback(data){
		/*if(!app){
			app = getMovie("App");	
		}	
		app.getUserInfoCallback(data);*/
		var logs = SendMessage("SocialNetwork", "GetUserInfoCallback",JSON.stringify(data));

	}

	function getUsersInfoCallback(data,respondID){
		/*if(!app){
			app = getMovie("App");	
		}	
		app.getUsersInfoCallback(data,respondID);*/
		console.log(data);
		console.log(respondIds);
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < respondIds.length; j++) {
				if (respondIds[j].uid == data[i].uid) {
					var result = data[i];
					result.requestId = respondIds[j].requestId;
					var logs = SendMessage("SocialNetwork", "GetUsersInfoCallback",JSON.stringify(result));
					respondIds.splice(j, 1);
					j--;
				}
			}
			
			console.log(JSON.stringify(result));
		}
	}

	function getFriendsSidsCallback(data){
	/*	if(!app){
			app = getMovie("App");	
		}		
		app.getFriendsSidsCallback(data);*/
		var logs = SendMessage("SocialNetwork", "GetFriendsSidsCallback",JSON.stringify(data));
	}

	function getFriendsInfoCallback(data){
		
	/*	if(!app){
			app = getMovie("App");	
		}		
		app.getFriendsSidsCallback(data);*/
		var logs = SendMessage("SocialNetwork", "GetFriendsInfoCallback",JSON.stringify(data));
	}
	
	function onPaymentFail(errorCode){
		var logs = SendMessage("SocialNetwork", "PaymentFail", errorCode);
	}

	function onPaymentSuccess(orderId){
		var logs = SendMessage("SocialNetwork", "PaymentSuccess", orderId);
	}

	function onPaymentCancel(){
		var logs = SendMessage("SocialNetwork", "PaymentCancel");
	}
	
	function getLocalStorageValue(key, queryId){
		var data = {
			queryId:queryId,
			key:key,
			value:""
		}; 
		if (localStorage[key] != undefined) {
			data.value = localStorage[key];
		}
		SendMessage("SocialNetwork", "ReceiveStorageValue", JSON.stringify(data));
	}

	function setLocalStorageValue(key, value){
		localStorage[key] = value;
	}

	function SendMessage(obj, method, data) {
		gameInstance.SendMessage(obj, method, data) 
	}