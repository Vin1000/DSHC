//Launch Help Center
document.addEventListener("deviceready", onDeviceReady, false);
var url = "https://help.deepsecurity.trendmicro.com/Welcome.html";
//IAB reference
var ref = null;

$('.app').click(goToHelpCenter);

function onDeviceReady() {
	//override
	window.open = cordova.InAppBrowser.open;
	goToHelpCenter();
	
	
}

function goToHelpCenter() {
	ref = cordova.InAppBrowser.open(url, '_blank', 'location=no');
	ref.addEventListener('loadstart',iabLoadStart);
	ref.addEventListener('loadstop', iabLoadStop);
	ref.addEventListener('loaderror', iabLoadError);
	ref.addEventListener('exit', iabClose);
}

function iabLoadStart(event) {
	//alert('start: ' + event.url);
}

function iabLoadStop(event) {
	//alert('stop: ' + event.url);
	var js = "var menu = $('aside.right-off-canvas-menu');menu.addClass('left-off-canvas-menu');menu.removeClass('right-off-canvas-menu');var icon = $('.right-off-canvas-toggle');icon.addClass('left-off-canvas-toggle');icon.removeClass('right-off-canvas-toggle');icon.attr('style', 'right:" + (window.screen.width - 50) + "px;background-color:#333333;border-radius:4px;');var child = $(menu.children()[0]);child.attr('data-mc-css-sub-menu','left-submenu');";
	js += "$(document).foundation('offcanvas', 'reflow');";
	ref.executeScript({
		code: js
	}, function() {
		//success
	});
	ref.insertCSS({
		code: "div.link-list-popup{left:7px;margin-right:10px!important;overflow-y: scroll;max-height: 300px;}"
	});
}

function iabLoadError(event) {
	//alert('error: ' + event.message);
	iabClose();
}

function iabClose(event) {
	//alert('exit')
	ref.removeEventListener('loadstart',iabLoadStart);
	ref.removeEventListener('loadstop', iabLoadStop);
	ref.removeEventListener('loaderror', iabLoadError);
	ref.removeEventListener('exit', iabClose);
	ref = null;
	goToHelpCenter();
}