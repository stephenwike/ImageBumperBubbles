function AddEventListeners()
{
	var canvas = getCanvas();
	canvas.addEventListener('canvasClick', GetFocusedImage, false);
	canvas.addEventListener('position', UpdateCoordinates, false);
}