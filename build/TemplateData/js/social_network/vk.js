function SnsVK(){	
	this.key="vk";
	this.initialize = function (appID) {
		    VK.init(function() { 
			 // API initialization succeeded 
			 // Your code here 
				//initApp();	
				
			dispatchEvent(new Event("VK_INITIALIZED"))
			VK.addCallback('onOrderSuccess', function(orderId) {
					onPaymentSuccess(orderId);
			});
			VK.addCallback('onOrderFail', function(errorId) {
				onPaymentFail(errorId);
			});
			VK.addCallback('onOrderCancel', function() {
				onPaymentCancel();
			});
		}, function() { 
			 // API initialization failed 
			 // Can reload page here 
		}, '5.52'); 
	};
	
	this.getUserInfo =	function (){
		VK.api(
			'users.get', 
			{fields: 'first_name,last_name,photo_50,uid,email'}, 	
			function(r) { 
				console.log(r);	
				if(r.response) {
					var result = {
						FirstName:r.response[0].first_name,
						LastName:r.response[0].last_name,
						Photo:r.response[0].photo_50,
						uid:r.response[0].id.toString(),
						authKey:getParameterByName('auth_key',location.href),
						email:"none"
					}			
					getUserInfoCallback(result);
				}
			}
		);
	};
		
	this.getAppFriends = function (){
		VK.api(
			'friends.getAppUsers', 
			{}, 	
			function(r) { 
				console.log(r);	
				
				if(r.response) { 								
					getFriendsSidsCallback(r.response);
				}
			}
		);
	};	
	
	this.getFriendsInfo = function() {
		VK.api(
			'friends.get', 
			{
				fields: "uid, " +
				"first_name, " +
				"last_name, " +
				"photo"
			}, 	
			function(r) {
				console.log(r);	
				VK.api(
					'friends.getAppUsers', 
					{}, 	
					function(appFriends) { 
						console.log("appFriends");	
						console.log(appFriends);	
						var result = new Array();
						for (var i = 0; i < r.response.items.length; i++) {
							friend = r.response.items[i];
							result[i] = {
								FirstName:friend.first_name,
								LastName:friend.last_name,
								Photo:friend.photo,
								uid:friend.id,							
								isAppUser:appFriends.response.indexOf(friend.id) != -1
							}
						}
						if(r.response) { 								
							getFriendsInfoCallback(result);
						}
						console.log("result is");
						console.log(result);
					}
				);
			}
		);
	}
		
	this.getUsersInfo = function(uids,respondID){	
		console.log(uids);						
		VK.api(
			"users.get",
			{
				user_ids:uids,
				fields: "uid, " +
				"first_name, " +
				"last_name, " +					
				"photo_50"
			},				
			function(r) { 
				console.log(r);	
				if(r.response) {
					var result = new Array();
					for(var i=0;i<r.response.length;i++){
						result[i] = {
							FirstName:r.response[i].first_name,
							LastName:r.response[i].last_name,
							Photo:r.response[i].photo_50,
							uid:r.response[i].id.toString(),
							authKey:""							
						}
					}						
					getUsersInfoCallback(result,respondID);
				}
			}
		);
		
	};

	this.navigateToProfile = function (uid){
		 window.open("https://vk.com/id" + uid, '_blank'); 
	};
	this.order = function (type, item){
		var params = { 
			type: "item", 
			item: item, 
			item_id: item 
		}; 
	  VK.callMethod('showOrderBox', params); 
	}
}