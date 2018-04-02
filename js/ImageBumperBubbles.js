// Set request animation frame;
window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)}(); 
	// simulate calling code 60 

// Fields
var circlesListCount = 0;
var startTime;

// Flags
var f_FirstClick = true;

// Accessors
function getCanvas() { return document.getElementById('image-bumber-bubbles-widget'); }
function getContext() {	return getCanvas().getContext('2d'); }

// Methods
function Animate(timestamp)
{
	ClearCanvas();
	DrawGrid();
	UpdateCircles();
	DrawCircles();

	var timestamp = timestamp || new Date().getTime();

	requestID = requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
		Animate(timestamp)
	})
}

function ClearCanvas()
{
	var canvas = getCanvas();
	var ctx = getContext();
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle="rgba(255,255,255,1)";  //"rgba(255,255,255,0.5)";
	ctx.fill();
}
