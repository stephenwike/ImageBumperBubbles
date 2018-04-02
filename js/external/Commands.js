(function AddListeners()
{
	myAlert("Adding Listeners!");
	var canvas = document.getElementById("image-bumber-bubbles-widget");
	canvas.addEventListener('returnHref', GetFocusedHref, false);
}())

function getBumperBubblesMousePosition(e)
{
	var canvas = document.getElementById("image-bumber-bubbles-widget");
	canvas.dispatchEvent(new CustomEvent( 'position', { 'detail': e } ) );
}
function getBumperBubblesClickedElement(e)
{
	var canvas = document.getElementById("image-bumber-bubbles-widget");
	canvas.dispatchEvent(new CustomEvent( 'canvasClick', { 'detail': e } ) );
}
function GetFocusedHref(e)
{
	myAlert(e.detail);
	window.location.href = e.detail;
}
