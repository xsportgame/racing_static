if (!String.prototype.format) {
  String.prototype.format = function() {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function(match, number) { 
	  return typeof args[number] != 'undefined'
		? args[number]
		: match
	  ;
	});
  };
}
function saveLog(uuid, eventJSON, eventType) {
	var user_agent = navigator.userAgent;
	var url = "https://script.google.com/macros/s/AKfycbwisI9fK_6un4phtt1H6fu3tWJ_alPzwMjSus0DJS5Kg0mKa7M/exec?uuid={0}&event_data={1}&event_type={2}&user_agent={3}";
	try {
		createIframe("log_error", url.format(uuid, escape(eventJSON), eventType, escape(user_agent)), false);
	} catch (err) {
		console.log(err);
	}
}

function createIframe(name, src, debug) {
  src = src || 'javascript:false'; // пустой src

  var tmpElem = document.createElement('div');

  // в старых IE нельзя присвоить name после создания iframe
  // поэтому создаём через innerHTML
  tmpElem.innerHTML = '<iframe name="' + name + '" id="' + name + '" src="' + src + '">';
  var iframe = tmpElem.firstChild;

  if (!debug) {
    iframe.style.display = 'none';
  }
	
  document.body.appendChild(iframe);
setTimeout(function () {
	try{
		tmpElem.outerHTML = "";
		delete tmpElem;
	} catch (err) {
		
	}
}, 5000);
  return iframe;
}