/** @format */

var x = new XMLHttpRequest();
x.open("GET", "style.css");
x.onload = function () {
  chrome.devtools.panels.openResource(x.responseText);
};
x.send();
