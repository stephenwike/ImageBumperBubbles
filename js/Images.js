// Collections
var Images = [];

// Methods
function LoadImages()
{
	var canvas = getCanvas();
	var img = canvas.firstChild;
	CircleCount = 0;
	for (var img = canvas.firstChild; img != null; img = img.nextSibling)
	{
		if (img.nodeName === "IMG")
		{
			Images.push(img);
			++CircleCount;
		}	
	}
}