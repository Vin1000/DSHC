/*
Trend Micro Deep Security Help Center Mobile App
A HackDay 7 Projet
By Vincent Pelletier
*/

//Launch Help Center
document.addEventListener("deviceready", onDeviceReady, false);
var url = "https://help.deepsecurity.trendmicro.com/Welcome.html";
//IAB reference
var ref = null;

function onDeviceReady() {
	//override
	window.open = cordova.InAppBrowser.open;
	goToHelpCenter();
}

function goToHelpCenter() {
	//open Help Center with InAppBrowser Cordova plugin
	ref = cordova.InAppBrowser.open(url, '_blank', 'location=no');
	ref.addEventListener('loadstart',iabLoadStart);
	ref.addEventListener('loadstop', iabLoadStop);
	ref.addEventListener('loaderror', iabLoadError);
	ref.addEventListener('exit', iabClose);
}

function iabLoadStart(event) {
	//page starting to load
}

function iabLoadStop(event) {
	//page fully loaded
	var js = "var menu = $('aside.right-off-canvas-menu');menu.addClass('left-off-canvas-menu');menu.removeClass('right-off-canvas-menu');";
	js += "var icon = $('.right-off-canvas-toggle');icon.addClass('left-off-canvas-toggle');icon.removeClass('right-off-canvas-toggle');icon.attr('style', 'right:" + (window.screen.width - 50) + "px;background-color:#333333;border-radius:4px;');";
	js += "var child = $(menu.children()[0]);child.attr('data-mc-css-sub-menu','left-submenu');";
	//re-render
	js += "$(document).foundation('offcanvas', 'reflow');";
	
	//give it some time (1ms)
	js = "setTimeout(function() {" + js + "}, 1);"
	ref.executeScript({
		code: js
	}, function() {
		//script done
	});
	//css override for "See all topics" popups
	ref.insertCSS({
		code: "div.link-list-popup{left:7px;margin-right:10px!important;overflow-y: scroll;max-height: 300px;}.tab-bar-section a.logo{left:40px;}"
	});
}

function iabLoadError(event) {
	//error - close and reopen webpage
	iabClose();
}

function iabClose(event) {
	//exiting
	ref.removeEventListener('loadstart',iabLoadStart);
	ref.removeEventListener('loadstop', iabLoadStop);
	ref.removeEventListener('loaderror', iabLoadError);
	ref.removeEventListener('exit', iabClose);
	ref = null;
	//reopen webpage
	goToHelpCenter();
}