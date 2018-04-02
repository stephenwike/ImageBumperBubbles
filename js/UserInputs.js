// User Provided Arguments
var MaxRadius = 70;
var MinRadius = 35;
var MaxSpeed = 0.4;
var MinSpeed = 0.1;
var HoverRadius = 150;

// Derived
var GridSize;
var Padding = 80;
var Border = 20;
var FramesPerSecond = 12;

function GetUserInputs()
{
	try
	{
		var canvas = getCanvas();
		if (canvas != null)
		{
			var params = canvas.getAttribute('value');
			if (params != null)
			{
				MaxRadius = params.MaxRadius || 49;
				MinRadius = params.MinRadius || 35;
				MaxSpeed = params.MaxSpeed || 0.4;
				MaxSpeed = params.MinSpeed || 0.1;
				HoverRadius = params.HoverRadius || 150;
			}
		}
	}
	catch (err)
	{
		myAlert("GetUserInputs(): " + err);
		console.log(err);
	}
}

function DeriveFields()
{
	GridSize = MaxRadius * 2 + 1;
}