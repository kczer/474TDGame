var TILE_H = 60;
var TILE_W = 60;
var regularTower = $('#tower');
var slowTower = $('#slowTurret');
var fastTower = $('#fastTurret');
var goldTower = $('#goldTurret');
var towerChosen = false;
var clickedTile;
var lastClickedTile = 'Thrower'; //this will be set when you click the toolbar so it knows what kind of tower to place
var previousTick=new Date().getTime();
var ticks = 0;

var levelOne = ["(4,0)","(4,1)","(3,1)","(2,1)","(1,1)","(1,2)","(1,3)","(2,3)","(3,3)","(4,3)","(4,4)"];


// THIS FILE DEALS WITH THE CLASSES FOR THE GAME OBJECTS
// THIS AREA ADDRESSES THE TOWER
function Tower(name, fireRate, damage, range, cost){
    this.name = name;
    this.fireRate = fireRate;
    this.damage = damage;
    this.cost = cost;
    this.range = range;
}

Tower.prototype.upgrade = function(cost, fireRate, damage){
  this.cost += cost;
  this.fireRate = fireRate;
  this.damage = damage;
}

Tower.prototype.sell = function(){
  return Math.floor(this.cost * .8);  
}

/*
// THIS AREA ADDRESSES THE ENEMY(FBI)
function Enemy(type, health, armor, speed,direction, x, y){
    this.type = type;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.health = health;
    this.armor = armor;
    this.speed = speed;
   this.checkDirection = function(){
		var tilex = Math.floor(this.x/TILE_W);
		var tiley = Math.floor(this.y/TILE_H);
		var pos = "(" + tilex + "," + tiley + ")";
		this.direction = gameGrid.grid[pos].nextDirection;
	}
	
	this.move = function(passedtime){
		if(this.direction === "UP"){
			this.y += passedtime*this.speed;
		}else if(this.direction === "DOWN"){
			this.y -= passedtime*this.speed;
		}else if(this.direction === "LEFT"){
			this.x -= passedtime*this.speed;
		}else if(this.direction === "RIGHT"){
			this.y += passedtime*this.speed;
		}else{
			console.log("err:"+passedtime+","+this.direction)
		}
	}
}
    
Enemy.prototype.damage = function(damage){
    this.health -= damage*((100-this.armor)/100);  
    return this.health <= 0;
}
*/

var moveEnemy = function(enemy, passedtime, me){
		var y = enemy.y;
		var x = enemy.x;
		var time = new Date()
		/*
		var passedTime = time.getTime();
		console.log ("passed"+passedTime);
		passedtime = passedtime- previousTick;
		console.log("time:"+passedtime);
		console.log("prev:"+previousTick);
		console.log("curr:"+(new Date().getTime()));
		*/
		ticks ++;
		console.log("ticks"+ticks);
		if(ticks > 10){
			//previousTick = new Date().getTime();
			if(enemy.direction === "UP"){
				x -= ticks*enemy.speed;
			}else if(enemy.direction === "DOWN"){
				x += ticks*enemy.speed;
			}else if(enemy.direction === "LEFT"){
				y -= ticks*enemy.speed;
			}else if(enemy.direction === "RIGHT"){
				y += ticks*enemy.speed;
			}else{
				console.log("err:"+passedtime+","+enemy.direction)
			}
			ticks = 0;
		}
		return {type : enemy.type, health: enemy.health, speed : enemy.speed, direction : enemy.direction, x : x, y : y};
		
	}
	
var checkDirection = function(enemy){
     	var tiley = Math.floor((enemy.y)/TILE_H);
     	var tilex = 0;
		if(enemy.direction=="UP"){
		 	tilex = Math.ceil((enemy.x)/TILE_W);
		 	var pos = "(" + tilex + "," + tiley + ")";
			var testvar = gameGrid.pathTiles[pos];
			if (typeof testvar == 'undefined'){
				tilex = Math.floor((enemy.x)/TILE_W);
			}
		}else{
			tilex = Math.floor((enemy.x)/TILE_W);
			var pos = "(" + tilex + "," + tiley + ")";
			var testvar = gameGrid.pathTiles[pos];
			if (typeof testvar == 'undefined'){
				tilex = Math.ceil((enemy.x)/TILE_W);
			}
		}
		
		
		
		//var tilex = Math.floor((enemy.x)/TILE_W);
		var pos = "(" + tilex + "," + tiley + ")";
		console.log("pos:"+pos)
		console.dir(gameGrid.pathTiles[pos]);
		return gameGrid.pathTiles[pos].nextDirection;
}

// THIS AREA ADDRESSES THE GAME
var Game = function(){
  this.wave = 0;
  this.money = 500;
  this.health = 100;
  this.enemies = [];
  this.passedTime = 0;
  this.previousTick=new Date().getTime();
  this.fps = 30;
  
  	this.nextWave = function(){ 
  		this.wave ++;
  		this.initEnemies();
	}

	this.initEnemies = function(wave){
		var numenemies = 5 + 5*wave;
		for(var i = 0; i < numenemies; i++){
			var starttilex= parseInt(levelOne[0].substr(1,2))*TILE_H;//-TILE_H*.5;
			var starttiley= parseInt(levelOne[0].substr(3,4))*TILE_W;
			//var en = new Enemy("", 100, 100, 1, "RIGHT", starttiley,starttilex);
			var en = {type : "", health: 100, speed : 1, direction : "RIGHT", x : starttilex, y : starttiley};
    		this.enemies.push(en);
		}
		console.log("enemies:"+this.enemies);
	}

	this.spendCredits = function(spent){
  		this.credits -= spent;  
	}

	this.earnedCredits = function(earn){
  		this.credits += earn;  
	}

	this.damageBase = function(){
  		this.health -=1;
  		return this.health <= 0;
	}


	this.run = function(){
		var me = this;
		this._intervalId = setInterval(this.tick(me), 1000 / Game.fps);
	}
	
	this.drawEnemies = function(){
		for( var enemy in this.enemies){
			var newTowerDiv = document.createElement("div");
			newTowerDiv.setAttribute("id",(clickedTile + "_T"));
			newTowerDiv.setAttribute("class","mapzone"); //remove hidden here and run if you want to see the prelim. map idea (not going to use the strange level format seen below however)
			newTowerDiv.style.left = this.enemies[enemy].y+200 + "px";
			newTowerDiv.style.top = this.enemies[enemy].x+200 + "px";
			newTowerDiv.style.backgroundImage = "url('http://www.placecage.com/40/40')";
			newTowerDiv.style.backgroundRepeat = "no-repeat";
			newTowerDiv.style.backgroundPosition = "center";
			document.body.appendChild(newTowerDiv);
		}
	}

	this.tick = function(me){
		console.log("tick");
		me.moveEnemies(me);
		me.shootTowers();
		me.drawEnemies();
	}
	
	this.getThis = function(){
		return this;
	}

	this.moveEnemies = function(){
  		for (var enemy in this.enemies){
  			console.log("enemys:"+this.enemies[enemy]);
  			this.enemies[enemy].direction = checkDirection(this.enemies[enemy]);
  			this.enemies[enemy] = moveEnemy(this.enemies[enemy], this.passedTime );
  			//this.enemies[enemy] = checkDirection(this.enemies[enemy]);
  			//this.enemies[enemy].checkDirection();
  			//this.enemies[enemy].move(this.passedTime);
  			//stuff
  		}
	}
	

	this.shootTowers = function(){
  		//TODO when map is solidified
	}
	
}



var towerPlaceLogic = function(){
	clickedTile = this.id;
	console.log(clickedTile);
	var tile = document.getElementById(clickedTile);
	var clickedPositon = $( this ).offset();
  		event.stopPropagation();
	if((gameGrid.grid[clickedTile.substring(0,5)].hasTower == true || (gameGrid.towers[clickedTile] != null)) &&  $("body").hasClass("cursor_change")){
	turnCursorOff();
	alert("Sorry there is a tower there");
	}
	if(gameGrid.grid[clickedTile.substring(0,5)].hasTower == false &&  $("body").hasClass("cursor_change")){
		var newTowerDiv = document.createElement("div");
		var newTowerObj = new Tower(document.getElementsByTagName("body")[0].classList.item(0), 20, 20, 20, 20); //plan to make the class on the body, which changes cursor, have the name of the tower your trying to place, this will then cascade down for naming / determining stats of everything
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
				mapzone.style.backgroundImage = "url('/img/grasstile60.png')";
				document.getElementById(pos).addEventListener("click",towerPlaceLogic);
			}
		}
	}
	this.markTileDirections();
}
	this.markTileDirections = function() {
		for (var i = 0; i <levelOne.length;i++){
			var tiley= parseInt(levelOne[i].substr(1,2));
			var tilex= parseInt(levelOne[i].substr(3,4));
			var pos = "(" + tiley + "," + tilex + ")";
			if(i<levelOne.length-1){
				var nexttiley= parseInt(levelOne[i+1].substr(1,2));
				var nexttilex= parseInt(levelOne[i+1].substr(3,4));
				if(tiley-nexttiley==1){
					this.pathTiles[pos].nextDirection="UP";	
				}else if (tiley-nexttiley==-1){
					this.pathTiles[pos].nextDirection="DOWN";	
				}else if (tilex-nexttilex==1){
					this.pathTiles[pos].nextDirection="LEFT";	
				}else if (tilex-nexttilex==-1){
					this.pathTiles[pos].nextDirection="RIGHT";	
				}else{
					console.log("ERR: ("+tilex+","+tiley+"), ("+nexttilex+","+nexttiley+")");
				}
			}else{
				this.pathTiles[pos].nextDirection="RIGHT";
			}
			console.log("dir:"+this.pathTiles[pos].nextDirection);
		}
	}
}


var turnCursorOn = function(e){
	
	//Shit that I added
	var clickedTower = this.id;
	$("body").addClass(clickedTower);
	$("body").addClass("cursor_change");
	regularTower.off("click", turnCursorOn);
	$("body").on("click", turnCursorOff);
    towerChosen = true;
    e.stopImmediatePropagation();
	//
	
	/*
    $("body").toggleClass("cursor_change");
    regularTower.off("click", turnCursorOn);
    $("body").on("click", turnCursorOff);
    towerChosen = true;
    e.stopImmediatePropagation();
    */
}

var turnCursorOff = function(){
    if(towerChosen == true){
    	$("body").removeClass();
    	//$("body").toggleClass("cursor_change");
    	$("body").off("click", turnCursorOff);
    	regularTower.on("click", turnCursorOn);
    	towerChosen = false;
    }
}

regularTower.on("click", turnCursorOn);
slowTower.on("click", turnCursorOn);
fastTower.on("click", turnCursorOn);
goldTower.on("click", turnCursorOn);

var gameGrid = new Grid(10,15);
gameGrid.createGrid();
//gameGrid.markTileDirections();
var newGame = new Game();
newGame.initEnemies(0);
//newGame.run();
var me =newGame.getThis();
setInterval(function() { newGame.tick(me) }, 1000 / newGame.fps);
