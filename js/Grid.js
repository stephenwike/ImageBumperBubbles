function DrawGrid()
{
	var canvas = getCanvas();
	var ctx = getContext();

	//Padding
	ctx.beginPath();
	ctx.lineWidth="1";
	ctx.strokeStyle="#000";
	ctx.rect(Padding,Padding,canvas.width - (2*Padding), canvas.height - (2*Padding));
	ctx.stroke(); 
	
	//Border
	ctx.beginPath();
	ctx.lineWidth=Border;
	ctx.strokeStyle="#DDD";
	ctx.rect(Border/2,Border/2,canvas.width - (Border), canvas.height - (Border));
	ctx.stroke();
	
	//Collision Grid
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeStyle="#aaa";
	ctx.rect(0,0,canvas.width, canvas.height);
	
	var moveX = 0;
	var moveY = 0;
	while(moveX < canvas.width)
	{
		ctx.moveTo(moveX, 0);
		ctx.lineTo(moveX, canvas.height);
		ctx.stroke();
		moveX += 100;
	}
	while(moveY < canvas.height)
	{
		ctx.moveTo(0, moveY);
		ctx.lineTo(canvas.width, moveY);
		ctx.stroke();
		moveY += 100;
	}
	
	// Draw Circle Vectors
	for (var index = 0; index < circlesListCount; ++index)
	{
		ctx.moveTo(circlesList[index].Vec.Xcoord, circlesList[index].Vec.Ycoord)
		ctx.lineTo(circlesList[index].Vec.Xcoord + (circlesList[index].Vec.Xlength * 400), 
			circlesList[index].Vec.Ycoord + (circlesList[index].Vec.Ylength * 400));
		ctx.stroke();
	}
}