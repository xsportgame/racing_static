var holder = {};

function UnityProgress (gameInstance, progress) {
	
  if (!gameInstance.Module)
    return;
  
  if (progress == 1) {
  }
  
  //
	this.progress = 0.0;
	this.message = "";

	var parent = document.getElementById("preloader");
	
	 // var background = document.createElement("div");
	// //background.style.background = "#4D4D4D";
	// background.style.position = "absolute";
	// parent.appendChild(background);
	// this.background = background;

	// var logoImage = document.createElement("img");
	// logoImage.src = "TemplateData/progresslogo.png"; 
	// logoImage.style.position = "absolute";
	// parent.appendChild(logoImage);
	// this.logoImage = logoImage;

	// var progressFrame = document.createElement("img");
	// progressFrame.src = "TemplateData/loadingbar.png"; 
	// progressFrame.style.position = "absolute";
	// parent.appendChild(progressFrame);
	// this.progressFrame = progressFrame;

	// var progressBar = document.createElement("img");
	// progressBar.src = "TemplateData/fullbar.png"; 
	// progressBar.style.position = "absolute";
	// parent.appendChild(progressBar);
	// this.progressBar = progressBar;
	if (webglEnabled) {
		
		var statusText = document.getElementById('status-text') || document.createElement("p");
		statusText.id = 'status-text'
		statusText.style.position = "absolute";
		//percentText.style.setProperty("text-align", "center");
		parent.appendChild(statusText);
		holder.statusText = statusText;
		holder.statusText.style.textAlign = 'center';
		
		holder.statusText.style.color = "#ffffff";
		holder.statusText.style.textAlign = 'right';
		holder.statusText.style.bottom = '-10px';
		holder.statusText.style.right = '70px';
		holder.statusText.style.width = '500px';
			
		var percentText = document.getElementById('percent-text') || document.createElement("p");
		percentText.id = 'percent-text'
		percentText.style.position = "absolute";
		//percentText.style.setProperty("text-align", "center");
		parent.appendChild(percentText);
		this.percentText = percentText;
		this.percentText.style.textAlign = 'center';
		holder.statusText.innerHTML = "Загрузка...";
		
		
		addEventListener("ON_GAME_LOADED", function (ev){
			holder.statusText.innerHTML = "Инициализация...";
			console.log(holder.statusText.innerHTML);
		})
		addEventListener("ON_USER_CONNECTING", function (ev){
			holder.statusText.innerHTML = "Соединение сервером...";
			console.log(holder.statusText.innerHTML);
		})
		addEventListener("ON_USER_AUTH", function (ev){
			holder.statusText.innerHTML = "Авторизация...";
			console.log(holder.statusText.innerHTML);
		})
		addEventListener("ON_USER_REGISTER", function (ev){
			holder.statusText.innerHTML = "Регистрация...";
			console.log(holder.statusText.innerHTML);
		})
		addEventListener("ERROR_OCCURED", function (ev){
			holder.statusText.innerHTML = "Возникла ошибка...";
			console.log(holder.statusText.innerHTML);
		})
		addEventListener("ON_GAME_INITIALIZE_FINISHED", function (ev){
			holder.statusText.innerHTML = "Готово";
			console.log(holder.statusText.innerHTML);
			setTimeout(function (){
				document.getElementById("preloader").style.display = "none";
				
			}, 2);
		})
	}
	// var messageArea = document.createElement("p");
	// messageArea.style.position = "absolute";
	// parent.appendChild(messageArea);
	// this.messageArea = messageArea; 


	this.SetProgress = function (progress) { 
		if (this.progress < progress) {
			this.progress = progress; 
			if (this.progress >= 1) {
				
				dispatchEvent(new Event("ON_GAME_LOADED"));
			}
		}
		
		// this.messageArea.style.display = "none";
		// this.progressFrame.style.display = "inline";
		// this.progressBar.style.display = "inline";		
		this.Update();
	}

	this.SetMessage = function (message) { 
		// this.message = message; 
		 // this.background.style.display = "inline";
		// this.logoImage.style.display = "inline";
		// this.progressFrame.style.display = "none";
		// this.progressBar.style.display = "none";		 
		this.Update();
	}

	this.Clear = function() {
		 // this.background.style.display = "none";
		// this.logoImage.style.display = "none";
		// this.progressFrame.style.display = "none";
		// this.progressBar.style.display = "none"; 
	}

	this.Update = function() {
		 // this.background.style.top = this.dom.offsetTop + 'px';
		// this.background.style.left = this.dom.offsetLeft + 'px';
		// this.background.style.width = this.dom.offsetWidth + 'px';
		// this.background.style.height = this.dom.offsetHeight + 'px';

		// var logoImg = new Image();
		// logoImg.src = this.logoImage.src;
		// var progressFrameImg = new Image();
		// progressFrameImg.src = this.progressFrame.src;
		
		// this.logoImage.style.top = this.dom.offsetTop + (this.dom.offsetHeight * 0.5 - logoImg.height * 0.5) + 'px';
		// this.logoImage.style.left = this.dom.offsetLeft + (this.dom.offsetWidth * 0.5 - logoImg.width * 0.5) + 'px';
		// this.logoImage.style.width = logoImg.width+'px';
		// this.logoImage.style.height = logoImg.height+'px';

		// this.progressFrame.style.top = this.dom.offsetTop + (this.dom.offsetHeight * 0.5 + logoImg.height * 0.5 + 10) + 'px';
		// this.progressFrame.style.left = this.dom.offsetLeft + (this.dom.offsetWidth * 0.5 - progressFrameImg.width * 0.5) + 'px';
		// this.progressFrame.width = progressFrameImg.width;
		// this.progressFrame.height = progressFrameImg.height;

		if (webglEnabled) {
			this.percentText.innerHTML = Math.round(this.progress*100) + "%";
			// this.messageArea.style.width = '100%';
			this.percentText.style.color = "#ffffff";
			this.percentText.style.textAlign = 'center';
			this.percentText.style.top = '640px';
			this.percentText.style.left = '940px';
			this.percentText.style.width = '50px';
		}
		//this.percentText.width = progressFrameImg.width;
		// this.percentText.height = progressFrameImg.height;
		
		// this.progressBar.style.top = this.progressFrame.style.top;
		// this.progressBar.style.left = this.progressFrame.style.left;
		// this.progressBar.width = progressFrameImg.width * Math.min(this.progress, 1);
		// this.progressBar.height = progressFrameImg.height;

		// // this.message = this.progress;
		
		// this.messageArea.style.top = this.progressFrame.style.top;
		// this.messageArea.style.left = 0;
		// this.messageArea.style.width = '100%';
		// this.messageArea.style.textAlign = 'center';
		// this.messageArea.innerHTML = this.message; 
	}

	this.Update ();
	this.SetProgress(progress)
}