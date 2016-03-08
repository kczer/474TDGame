var TILE_H = 15;
var TILE_W = 15;
var MAP_H = 30;
var MAP_W = 80;
 

var drawMap = function()
{
	// create the map zone
	for(var j = 0; j < MAP_H; j++)
	{
		for(var i = 0; i < MAP_W; i++)
		{
			var mapzone = document.createElement("div");
			mapzone.setAttribute("id","mapzone"+i);
			mapzone.setAttribute("class","mapzone hidden"); //remove hidden here and run if you want to see the prelim. map idea (not going to use the strange level format seen below however)
			mapzone.style.left = TILE_H*i + "px";
			mapzone.style.top = TILE_W*j + "px";
			if(level1(i,j))
			{
				mapzone.style.backgroundColor = "#1E90FF";
			}
			else
			{
				// if it isn't part of the map, its a drop target for a turret
			}
			document.body.appendChild(mapzone);
		}
	}
}

var level1 = function(i,j)
{
	if(	(i == 0 && (j >= 0 && j <= 2))
		|| (j == 2 && (i >=0 && i < 70))
		|| (i == 70 && (j >=2 && j <= 28))
		|| (j == 28 && (i <= 70 && i >= 60))
		|| (i == 60 && (j <= 28 && j >= 5))
		|| (j == 5 && (i <= 60 && i >= 40))
		|| (i == 40 && (j >= 5 && j <= 25))
		|| (j == 25 && (i <= 40 && i >= 30))
		|| (i == 30 && (j >= 20 && j <= 25))
		|| (j == 20 && (i <= 30 && i >= 5))
		|| (i == 5 && (j <= 20 && j >= 10))
		|| (j == 10 && (i >= 5 && i <= 80))
		)
	{
		return true;
	}
	return false;
}

drawMap();