var TILE_H = 60;
var TILE_W = 60;
var testTower = $('#tower');
var towerChosen = false;
var clickedTile;
var lastClickedTile = 'Thrower'; //this will be set when you click the toolbar so it knows what kind of tower to place

var levelOne = ["(4,0)","(4,1)","(3,1)","(2,1)","(1,1)","(1,2)","(1,3)","(2,3)","(3,3)","(4,3)","(4,4)","(4,5)","(5,5)","(6,5)","(7,5)","(7,6)","(7,7)","(6,7)","(5,7)","(4,7)","(4,8)","(4,9)","(3,9)","(2,9)","(1,9)","(1,10)","(1,11)","(2,11)","(3,11)","(4,11)","(5,11)","(6,11)","(6,10)","(7,10)","(8,10)","(9,10)","(9,11)","(9,12)","(9,13)","(8,13)","(8,14)"];//42 tiles

var levelTwo = ["(9,0)","(9,1)","(8,1)","(7,1)","(6,1)","(5,1)","(4,1)","(3,1)","(2,1)","(1,1)","(1,2)","(1,3)","(1,4)","(1,5)","(2,5)","(3,5)","(4,5)","(4,6)","(4,7)","(5,7)","(6,7)","(7,7)","(8,7)","(8,8)","(8,9)","(8,10)","(8,11)","(7,11)","(6,11)","(5,11)","(4,11)","(3,11)","(2,11)","(1,11)","(1,12)","(1,13)","(1,14)",];//37 tiles

var levelThree = ["(0,0)","(0,1)","(1,1)","(1,2)","(2,2)","(2,3)","(3,3)","(3,4)","(4,4)","(4,5)","(5,5)","(4,5)","(5,6)","(6,6)","(6,7)","(7,7)","(7,8)","(7,9)","(6,9)","(6,10)","(5,10)","(5,11)","(4,11)","(4,12)","(3,12)","(3,13)","(2,13)","(2,14)","(1,14)"];//28 tiles

var levelFour = ["(1,0)","(1,1)","(1,2)","(1,3)","(1,4)","(2,4)","(3,4)","(3,3)","(3,2)","(3,1)","(4,1)","(5,1)","(5,2)","(5,3)","(5,4)","(5,5)","(5,6)","(6,6)","(7,6)","(7,5)","(7,4)","(7,3)","(7,2)","(7,1)","(8,1)","(9,1)","(9,2)","(9,3)","(9,4)","(9,5)","(9,6)","(9,7)","(9,8)","(8,8)","(7,8)","(6,8)","(5,8)","(4,8)","(3,8)","(2,8)","(1,8)","(0,8)","(0,9)","(0,10)","(0,11)","(1,11)","(2,11)","(3,11)","(4,11)","(5,11)","(5,12)","(5,13)","(4,13)","(3,13)","(2,13)","(1,13)","(1,14)"];//56 tiles

var levelFive = ["(5,0)","(5,1)","(4,1)","(4,2)","(3,2)" ,"(2,3)","(3,3)","(2,4)","(1,4)","(1,5)","(0,5)","(0,6)","(0,7)","(1,7)","(2,7)","(2,6)","(3,6)","(4,6)","(5,6)", "(6,6)","(7,6)","(8,6)","(8,7)","(8,8)","(8,9)","(8,10)","(7,10)","(6,10)","(5,10)","(5,9)","(4,9)","(3,9)","(3,10)","(2,10)","(1,10)","(1,11)","(1,12)","(2,12)","(3,12)","(3,13)","(4,13)","(5,13)","(5,12)","(6,12)","(7,12)","(8,12)","(8,13)","(9,13)","(9,14)"];//45 tiles


// THIS FILE DEALS WITH THE CLASSES FOR THE GAME OBJECTS
// THIS AREA ADDRESSES THE TOWER
function Tower(name, fireRate, damage, range, cost){
    this.name = name;
    this.fireRate = fireRate;
    this.damage = damage;
    this.cost = cost;
    this.range = range;
};

Tower.prototype.upgrade = function(cost, fireRate, damage){
  this.cost += cost;
  this.fireRate = fireRate;
  this.damage = damage;
};

Tower.prototype.sell = function(){
  return Math.floor(this.cost * .8);  
};

// THIS AREA ADDRESSES THE ENEMY(FBI)
function Enemy(type, health, armor, speed,direction, x, y){
    this.type = type;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.health = health;
    this.armor = armor;
    this.speed = speed;
};

Enemy.prototype.move = function(passedtime){
	if(this.direction === "UP"){
		this.y += passedtime*this.speed;
	}else if(this.direction === "DOWN"){
		this.y -= passedtime*this.speed;
	}else if(this.direction === "LEFT"){
		this.x -= passedtime*this.speed;
	}else if(this.direction === "RIGHT"){
		this.y += passedtime*this.speed;
	}
}
    
Enemy.prototype.damage = function(damage){
    this.health -= damage*((100-this.armor)/100);  
    return this.health <= 0;
};


// THIS AREA ADDRESSES THE GAME
function Game(){
  this.wave = 0;
  this.money = 500;
  this.health = 100;
  this.Enemies = this.initEnemies(0);
};

Game.prototype.nextWave = function(){
  this.wave ++;
  this.initEnemies();
};

Game.prototype.initEnemies = function(wave){
	var numenemies = 5 + 5*wave;
	for(var i = 0; i < numenemies; i++){
		var starttiley= parseInt(levelOne[0].substr(1,2))*TILE_H-.5*TILE_H;
		var starttilex= parseInt(levelOne[0].substr(3,4))*TILE_W;
		var en = new Enemy("", 100, 100, 1, "LEFT", 0,0);
    	this.enemies.push(en);//Will be changed to dynamic function
	}
};

Game.prototype.spendCredits = function(spent){
  this.credits -= spent;  
};

Game.prototype.earnedCredits = function(earn){
  this.credits += earn;  
};

Game.prototype.damageBase = function(){
  this.health -=1;
  return this.health <= 0;
};

Game.prototype.fps = 30;

Game.prototype.run = function(){
	Game.prototype._intervalId = setInterval(this.tick, 1000 / Game.fps);
}


Game.prototype.tick = function(){
	var passedtime = new Date().getTime() - Game.prototype.previousTick;
	Game.prototype.previousTick = new Date().getTime();
	this.moveEnemies(passedtime);
	this.shootTowers(passedtime);
}

Game.prototype.moveEnemies = function(passedtime){
  //TODO when map is solidified
  for (var enemy in this.enemies){
  	this.checkDirection(enemy);
  	enemy.move(passedtime);
  	//stuff
  }
}

Game.prototype.checkDirection = function(enemy){
	
}

Game.prototype.shootTowers = function(passedtime){
  //TODO when map is solidified
}

var towerPlaceLogic = function(){
	clickedTile = this.id;
	var tile = document.getElementById(clickedTile);
	var clickedPositon = $( this ).offset();
  		event.stopPropagation();
	if((gameGrid.grid[clickedTile.substring(0,5)].hasTower == true || (gameGrid.towers[clickedTile] != null)) &&  $("body").hasClass("cursor_change")){
	turnCursorOff();
	alert("Sorry there is a tower there");
	}
	if(gameGrid.grid[clickedTile.substring(0,5)].hasTower == false &&  $("body").hasClass("cursor_change")){
		var newTowerDiv = document.createElement("div");
		var newTowerObj = new Tower(document.getElementsByTagName("body")[0].classList.item(0), 20, 20, 20, 20) //plan to make the class on the body, which changes cursor, have the name of the tower your trying to place, this will then cascade down for naming / determining stats of everything
		newTowerDiv.setAttribute("id",(clickedTile + "_T"));
		newTowerDiv.setAttribute("class","mapzone"); //remove hidden here and run if you want to see the prelim. map idea (not going to use the strange level format seen below however)
		newTowerDiv.style.left = (TILE_H*(gameGrid.grid[clickedTile].locationY)+200) + "px";
		newTowerDiv.style.top = (TILE_W*(gameGrid.grid[clickedTile].locationX)+200) + "px";
		gameGrid.towers[clickedTile] = newTowerObj; 
		console.log(gameGrid.towers[clickedTile]); //array of tower objects indexed at location on grid
		gameGrid.grid[clickedTile].hasTower = true;
		gameGrid.grid[clickedTile].towerType = lastClickedTile;
		console.log(gameGrid.grid[clickedTile]); //updated grid tile to reflect having tower 
		turnCursorOff();
		newTowerDiv.style.backgroundImage = "url('http://www.placecage.com/30/30')";
		newTowerDiv.style.backgroundRepeat = "no-repeat";
		newTowerDiv.style.backgroundPosition = "center";
		newTowerDiv.addEventListener("click",towerPlaceLogic);
		document.body.appendChild(newTowerDiv);
	}
}

var Grid = function(mapHeight,mapWidth) {
    var mapHeight = mapHeight;
    var mapWidth = mapWidth;
    this.grid = {};
    this.towers = {};
    this.pathTiles = {};
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
			document.body.appendChild(mapzone);
			if(levelOne.indexOf(pos) > -1)
			{
				mapzone.style.backgroundColor = "brown";
				mapzone.style.backgroundImage = "url('/img/pathtile60.png')";
				this.grid[pos] = pathTile;
				this.pathTiles[pos] = pathTile;
			}
			else
			{
				this.grid[pos] = nonPathTile;
				mapzone.style.backgroundImage = "url('/img/grasstile2.png')";
				document.getElementById(pos).addEventListener("click",towerPlaceLogic);
			}
		}
	}
}
	this.markTileDirections = function() {
		for (var pathTile in this.pathTiles){
			//pathTile.locationX
		}
	}
}

var turnCursorOn = function(e){
    $("body").toggleClass("cursor_change");
    testTower.off("click", turnCursorOn);
    $("body").on("click", turnCursorOff);
    towerChosen = true;
    e.stopImmediatePropagation();
}

var turnCursorOff = function(){
    if(towerChosen == true){
    $("body").toggleClass("cursor_change");
    $("body").off("click", turnCursorOff);
    testTower.on("click", turnCursorOn);
    towerChosen = false;
    }
}

testTower.on("click", turnCursorOn);
var gameGrid = new Grid(10,15);
gameGrid.createGrid();
