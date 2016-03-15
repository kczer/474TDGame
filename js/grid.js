var TILE_H = 60;
var TILE_W = 60;

var levelOne = ["(4,0)","(4,1)","(3,1)","(2,1)","(1,1)","(1,2)","(1,3)","(2,3)","(3,3)","(4,3)","(4,4)"];

var Grid = function(mapHeight,mapWidth) {
    this.grid = {};
    // create the map zone
	
    this.createGrid = function() {
	for(var j = 0; j < mapHeight; j++)
	{
		for(var i = 0; i < mapWidth; i++)
		{
			var mapzone = document.createElement("div");
			var nonPathTile={locationY: i, locationX: j, hasTower: false,  towerType: null}; //create a new key/dictionary value for each cell/tile in our table into our grid obj, which will keep track of what exists in each cell
            var pathTile = {nextDirection: null, hasEnemy: null};
            var pos = "(" + j + "," + i + ")"; //gives us our position for these cells as a coordinate
			mapzone.setAttribute("id",pos);
			mapzone.setAttribute("class","mapzone"); //remove hidden here and run if you want to see the prelim. map idea (not going to use the strange level format seen below however)
			mapzone.style.left = (TILE_H*i) + "px";
			mapzone.style.top = (TILE_W*j) + "px";
			if(levelOne.indexOf(pos) > -1)
			{
				mapzone.style.backgroundColor = "blue";
				this.grid[pos] = pathTile;
			}
			else
			{
				console.log(levelOne[pos]);
				this.grid[pos] = nonPathTile;				
			}
			document.body.appendChild(mapzone);
		}
	}
}
}
// var gameGrid = new Grid(5,5);
// gameGrid.createGrid();