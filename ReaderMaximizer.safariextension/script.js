/**
 * Safari extension that maximizes the visible space in Google Reader when the user hits a hotkey.
 * Author: Celso Ulises Juarez Ramirez (cjuarez)
 * Contact: celsojuarez at gmail
 */
function config() {
	var conf = {},
		elements = [];
	/**
	 * Elements to hide
	 */
	//header
	elements.push("gb");
	//Reader Logo
	elements.push("logo-section");
	//viewer header
	elements.push("viewer-header-container");
	//subscribe button
	elements.push("lhn-add-subscription-section");
	//blog tittle
	elements.push("title-and-status-holder");
	//section headers
	elements.push("sections-header");
	conf.elementsList = elements;
	//keycode to call the execute funciton
	//87 is for "W", 199 is for "w".
	conf.keycode = {};
	conf.keycode.lowercase = 119;
	conf.keycode.uppercase = 87;
	return conf;
}

var conf = config(),
	isMinimized = false;

function execute() {
	var i = 0,
		hash = window.location.hash,
		D = document,
		newHeight = Math.max(
       		Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
       		Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
       		Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    	),
    	property = (isMinimized) ? "block" : "none";
	for (i; i < conf.elementsList.length; i++) {
		elem =  D.getElementById(conf.elementsList[i]);
		// viewer header container shouldn't be visible in overview page (index)
		if (conf.elementsList[i] === "viewer-header-container" && hash === "#overview-page") {
			elem.style.display = "none";
		} else if (elem) {
			elem.style.display = property;
		}
	}
	D.getElementById("viewer-entries-container").style.height = 
		(newHeight - height("gb") - height("viewer-header-container") - height("title-and-status-holder") - height("sections-header")) + "px";
	D.getElementById("scrollable-sections").style.height = 
		(newHeight - height("gb") - height("logo-section") - height("lhn-add-subscription-section")) + "px";
	isMinimized = !isMinimized;
}

function height(el) {
	return (document.getElementById(el)) ? document.getElementById(el).scrollHeight : 0;
}

document.onkeypress = function (e) {
	var k = e.keyCode, keys = [];
	keys[k] = true;
	if (keys[conf.keycode.uppercase] || keys[conf.keycode.lowercase]) {
		execute();
	}
};