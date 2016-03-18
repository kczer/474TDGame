var TILE_H = 60;
var TILE_W = 60;
var clickedTile;
var lastClickedTile = 'Thrower'; //this will be set when you click the toolbar so it knows what kind of tower to place

var levelOne = ["(4,0)","(4,1)","(3,1)","(2,1)","(1,1)","(1,2)","(1,3)","(2,3)","(3,3)","(4,3)","(4,4)"];

var towerPlaceLogic = function(){
	clickedTile = this.id;
	var tile = document.getElementById(clickedTile);
	var clickedPositon = $( this ).offset();
  		event.stopPropagation();
	if(gameGrid.grid[clickedTile].hasTower == false){
		gameGrid.grid[clickedTile].hasTower = true;
		gameGrid.grid[clickedTile].towerType = lastClickedTile;
		tile.style.backgroundImage = "url('http://www.placecage.com/30/30')";
		tile.style.backgroundRepeat = "no-repeat";
		tile.style.backgroundPosition = "center";
	}
	else
	alert("Sorry there is a tower there");
}

var Grid = function(mapHeight,mapWidth) {
    var mapHeight = mapHeight;
    var mapWidth = mapWidth;
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
			mapzone.setAttribute("class","mapzone hidden"); //remove hidden here and run if you want to see the prelim. map idea (not going to use the strange level format seen below however)
			mapzone.style.left = (TILE_H*i+200) + "px";
			mapzone.style.top = (TILE_W*j+200) + "px";
			// document.body.appendChild(mapzone);

			document.getElementById("game").appendChild(mapzone);
			if(levelOne.indexOf(pos) > -1)
			{
				mapzone.style.backgroundColor = "brown";
				this.grid[pos] = pathTile;
			}
			else
			{
				this.grid[pos] = nonPathTile;
				document.getElementById(pos).addEventListener("click",towerPlaceLogic);
			}
		}
	}
}
}
var gameGrid = new Grid(5,5);
gameGrid.createGrid();
console.log(gameGrid.grid["(0,4)"]);
