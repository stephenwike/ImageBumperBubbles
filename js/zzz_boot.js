(function InitializeAnimation()
{
	LoadImages();
	InitializeBubbles();
	
	requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
		startTime = timestamp || new Date().getTime(); //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
		Animate(timestamp)
	});
}())