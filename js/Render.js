var frameBorderWidth = 5;
var frameBorderColor = "purple";

function DrawCircles(canvas)
{
	for (var index = 0; index < CircleCount; ++index)
	{
		DrawCircle(circlesList[index], Images[index]);
	}
}

function DrawCircle(circle, img)
{
	var ctx = getContext();
	
		ctx.save();
		//---------------------------------------------
		
		// Define Clip Path
		ctx.beginPath();
		ctx.arc(circle.Vec.Xcoord, circle.Vec.Ycoord, circle.Radius,0,2*Math.PI);
		ctx.closePath();

		// Render Path
		ctx.lineWidth = frameBorderWidth;
		ctx.strokeStyle = frameBorderColor;
		ctx.stroke();
		
		// Clip Path
		ctx.clip();
	
		// Determine Image Dimensions
		var diameter = circle.Radius * 2;
		console.log(img.naturalHeight + "X" + img.naturalWidth);
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
	
	
	
	//var canvas = getCanvas();
	//var ctx = getContext();
	//ctx.beginPath();
	
	//ctx.arc(circle.Vec.Xcoord, circle.Vec.Ycoord, circle.Radius,0,2*Math.PI);
	//
	//// Create gradient
	//var grd = ctx.createLinearGradient(circle.Vec.Xcoord - circle.Radius, circle.Vec.Ycoord - circle.Radius, circle.Vec.Xcoord + circle.Radius, circle.Vec.Ycoord + circle.Radius);
    //
	//if(circle.isHit)
	//{
	//	grd.addColorStop(0, "rgba(255, 153, 238, 0.9)");
	//	grd.addColorStop(1, "rgba(255, 51, 170, 0.9)");
	//}
	//else
	//{
	//	grd.addColorStop(0, "rgba(0, 153, 238, 0.9)");
	//	grd.addColorStop(1, "rgba(0, 51, 170, 0.9)");
	//}
    //
	////Fill With Gradient
	//ctx.lineWidth="1";
	//ctx.fillStyle = grd;
	//ctx.fill();
    //
	//ctx.strokeStyle = '#2299EE';
	//ctx.stroke();
}