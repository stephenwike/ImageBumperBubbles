var Xpos;
var Ypos;

function UpdateCoordinates(e)
{
	Xpos = e.detail.offsetX;
    Ypos = e.detail.offsetY;
	DetectHover();
}

function DetectHover()
{
	for (var index = 0; index < ImageCount; ++index)
	{
		var dx = circlesList[index].Vec.Xcoord - Xpos;
		var dy = circlesList[index].Vec.Ycoord - Ypos;
		var hyp = Math.sqrt( dx * dx + dy * dy );
		if ( hyp < circlesList[index].Radius ) { circlesList[index].isFocused = true; }
		else circlesList[index].isFocused = false;
	}
}

function GetFocusedImage(e)
{
	var bubble = GetFirstFocusedImage();
	if (bubble != null)
	{
		var img = bubble.Image;
		if(img != null)
		{
			var retVal;
			var result = img.hasAttribute('alt');
			if(img.hasAttribute('alt'))
			{
				retVal = img.getAttribute('alt');
			}
			else if (img.hasAttribute('src'))
			{
				retVal = img.getAttribute('src');
			}
			
			// Send Response
			var canvas = getCanvas();
			canvas.dispatchEvent(new CustomEvent('returnHref', { 'detail': retVal } ) );
		}
	}
}

function GetFirstFocusedImage()
{
	for (var index = 0; index < ImageCount; ++index)
	{
		if(circlesList[index].isFocused)
		{
			return circlesList[index];
		}
	}
	return null;
}
