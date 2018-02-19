function InitializeBubbles()
{
	circlesList = [];
	circlesListCount = 0;
	for (var index = 0; index < CircleCount; ++index)
	{
		var circle = MakeCircle();
		if(!BallCollision(circle, 0))
		{
			circlesList.push(circle);
			++circlesListCount;
		}
		else
		{
			--index;
		}
	}
}

function MakeCircle()
{
	var canvas = getCanvas();
	// Determine Vector Coordinates, Speed, Magnitude, Radius, and Collision Area
	var theta = Math.random() * 2 * Math.PI;
	var Speed = Math.random() * (MaxSpeed - MinSpeed) + MinSpeed;
	var radius = Math.round((Math.random() * (MaxRadius - MinRadius)) + MinRadius);
	var Xc = Math.round((Math.random() * (canvas.clientWidth - (2*Padding))) + Padding);
	var	Yc = Math.round((Math.random() * (canvas.clientHeight - (2*Padding))) + Padding);
	var XCol = GetCollisionBounds(Xc, radius);
	var YCol = GetCollisionBounds(Yc, radius);
	
	// Make Vector
	var newVector = {
		Xcoord: Xc,
		Ycoord: Yc,
		Xlength: Speed * Math.sin(theta),
		Ylength: Speed * Math.cos(theta)
	};
	
	// Make Circle
	var newCircle = {
		Vec: newVector,
		Radius: radius,
		CollisionX: XCol,
		CollisionY: YCol,
		isHit: false
	};
	
	return newCircle;
}

function UpdateCircles()
{
	try
	{
		for (var index = 0; index < CircleCount; ++index)
		{
			UpdatePoint(circlesList[index]);
		}
	}
	catch (err)
    {
        alert("UpdateCircles(): " + err.Message);
    }
}

function UpdatePoint(circle)
{
	try
	{
		do
		{
			// Assume circle starts in not hit state
			circle.isHit = false;
			
			// Determine Wall Collisions
			var whichWall = WallCollision(circle);
			if(whichWall)
			{
				if(whichWall == 1)
				{
					circle.Vec.Xlength = -circle.Vec.Xlength;
				}
				else if (whichWall == 2)
				{
					circle.Vec.Ylength = -circle.Vec.Ylength;
				}
				else
				{
					circle.Vec.Xlength = -circle.Vec.Xlength;
					circle.Vec.Ylength = -circle.Vec.Ylength;
				}
				circle.isHit = true;
			}
			
			// Determine Ball Collisions
			var whichBall = BallCollision(circle, 0);
			while(whichBall != 0)
			{
				ResolveCollision(circle, circlesList[whichBall - 1]);	
				whichBall = BallCollision(circle, whichBall);
				circle.isHit = true;
			}
			
			// Update Coordinates
			circle.Vec.Xcoord = circle.Vec.Xcoord + circle.Vec.Xlength;
			circle.Vec.Ycoord = circle.Vec.Ycoord + circle.Vec.Ylength;
			
			var XCol = GetCollisionBounds(circle.Vec.Xcoord, circle.Radius);
			var YCol = GetCollisionBounds(circle.Vec.Ycoord, circle.Radius);
			circle.CollisionX = XCol;
			circle.CollisionY = YCol;
		}
		while(circle.isHit);
	}
	catch (err)
    {
        alert("UpdatePoint(): " + err.Message);
    }
}

function WallCollision(circle)
{
	var canvas = getCanvas();
	var walls = 0;
	if(circle.Vec.Xcoord - circle.Radius < 0
		|| circle.Vec.Xcoord + circle.Radius > canvas.clientWidth)
	{
		walls += 1;
	}
	if(circle.Vec.Ycoord - circle.Radius < 0
		|| circle.Vec.Ycoord + circle.Radius > canvas.clientHeight)
	{
		walls += 2;
	}
	return walls;
}

function BallCollision(circle, index)
{
	for (; index < circlesListCount; ++index)
	{
		if (circlesList[index] != circle)
		{
			var testX = circlesList[index].CollisionX & circle.CollisionX;
			var testY = circlesList[index].CollisionY & circle.CollisionY;
			if (testX && testY) //Detects a potential collision
			{	
				var dx = circlesList[index].Vec.Xcoord - circle.Vec.Xcoord;
				var dy = circlesList[index].Vec.Ycoord - circle.Vec.Ycoord;
				var distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < circlesList[index].Radius + circle.Radius) {
					return index + 1; // collision detected!
				}
			}
		}
	}
	return 0;
}

function GetCollisionBounds(Coordinate, radius)
{
	var collisionbound = 0;
	
	var furthest = Coordinate + radius;
	var largeSection = Math.ceil(furthest / 100) - 1;
	var closest = Coordinate - radius;
	var smallSection = Math.ceil(closest / 100) - 1;
	
	collisionbound = Math.pow(2, largeSection);
	if (largeSection != smallSection)
	{
		collisionbound += Math.pow(2, smallSection);
	}
	
	return collisionbound;
}

function ResolveCollision(circle1, circle2)
{
	//		 | m1 - m2 |	   |  2 * m2 |
	// v1f = |---------| v1i + |---------| v2i
	//       | m1 + m2 |       | m1 + m2 |
	
	//Determine Mass
	var m1 = 2 * Math.PI * circle1.Radius * circle1.Radius;
	var m2 = 2 * Math.PI * circle2.Radius * circle2.Radius;
	
	//Get Velocities
	var v1xi = circle1.Vec.Xlength;
	var v2xi = circle2.Vec.Xlength;
	var v1yi = circle1.Vec.Ylength;
	var v2yi = circle2.Vec.Ylength;
	
	var v1xf = ((m1 - m2) / (m1 + m2)) * v1xi + ((2 * m2) / (m1 + m2)) * v2xi;
	var v1yf = ((m1 - m2) / (m1 + m2)) * v1yi + ((2 * m2) / (m1 + m2)) * v2yi;
	var v2xf = ((2 * m1) / (m1 + m2)) * v1xi + ((m2 - m1) / (m1 + m2)) * v2xi;
	var v2yf = ((2 * m1) / (m1 + m2)) * v1yi + ((m2 - m1) / (m1 + m2)) * v2yi;
	
	// Change Vectors
	circle1.Vec.Xlength = v1xf;
	circle1.Vec.Ylength = v1yf;
	circle2.Vec.Xlength = v2xf;
	circle2.Vec.Ylength = v2yf;
}