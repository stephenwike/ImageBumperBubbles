var frameBorderWidth = 5;
var frameBorderColor = "purple";

function DrawCircles(canvas)
{
	for (var index = 0; index < ImageCount; ++index)
	{
		DrawCircle(circlesList[index], Images[index]);
	}
}

function DrawCircle(circle, img)
{
	var ctx = getContext();
	
		ctx.save();
		//---------------------------------------------
		
		// Get Radius
		var radius = (circle.isFocused) ? HoverRadius : circle.Radius;
		
		// Define Clip Path
		ctx.beginPath();
		ctx.arc(circle.Vec.Xcoord, circle.Vec.Ycoord, radius ,0,2*Math.PI);
		ctx.closePath();

		// Render Path
		ctx.lineWidth = frameBorderWidth;
		ctx.strokeStyle = frameBorderColor;
		ctx.stroke();
		
		// Clip Path
		ctx.clip();
	
		// Determine Image Dimensions
		var diameter = radius * 2;
		var ratio;
		if (img.naturalheight > img.naturalWidth)
			ratio = diameter / img.naturalWidth;
		else
			ratio = diameter / img.naturalHeight;
		var height = img.naturalHeight * ratio;
		var width = img.naturalWidth * ratio;
		
		// Define Path
		ctx.beginPath();
		ctx.drawImage(img, circle.Vec.Xcoord - (width/2), circle.Vec.Ycoord - (height/2), width, height);
		
		//---------------------------------------------
		ctx.restore();
}