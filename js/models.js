var TILE_H = 60;
var TILE_W = 60;
var regularTower = $('#tower');
var slowTower = $('#slowTurret');
var fastTower = $('#fastTurret');
var goldTower = $('#goldTurret');
var towerChosen = false;
var clickedTile;
var clickedTower;
var previousTick=new Date().getTime();
var ticks = 0;
var idnum = 0;
var numticks = 0;
var money = 500;
var lives = 10;
var wave = 0;
var deadenemies = 0;
var towerticks = 0;

var regTowerObj = new Tower("tower",10,10,15,100,10,10,10);
var slowTowerObj = new Tower("slowTurret",5,15,7,75,10,10,10);
var fastTowerObj = new Tower("fastTurret",15,7,10,125,10,10,10);
var goldTowerObj = new Tower("goldTurret",20,20,10,200,10,10,10);

//var levelOne = ["(4,0)","(4,1)","(3,1)","(2,1)","(1,1)","(1,2)","(1,3)","(2,3)","(3,3)","(4,3)","(4,4)"];
//var levelOne = ["(4,0)","(4,1)","(3,1)","(2,1)","(1,1)","(1,2)","(1,3)","(2,3)","(3,3)","(4,3)","(4,4)","(4,5)","(5,5)","(6,5)","(7,5)","(7,6)","(7,7)","(6,7)","(5,7)","(4,7)","(4,8)","(4,9)","(3,9)","(2,9)","(1,9)","(1,10)","(1,11)","(2,11)","(3,11)","(4,11)","(5,11)","(6,11)","(6,10)","(7,10)","(8,10)","(9,10)","(9,11)","(9,12)","(9,13)","(8,13)","(8,14)"];//42 tiles

var levelOne = ["(9,0)","(9,1)","(8,1)","(7,1)","(6,1)","(5,1)","(4,1)","(3,1)","(2,1)","(1,1)","(1,2)","(1,3)","(1,4)","(1,5)","(2,5)","(3,5)","(4,5)","(4,6)","(4,7)","(5,7)","(6,7)","(7,7)","(8,7)","(8,8)","(8,9)","(8,10)","(8,11)","(7,11)","(6,11)","(5,11)","(4,11)","(3,11)","(2,11)","(1,11)","(1,12)","(1,13)","(1,14)",];//37 tiles

// V shaped -- var levelOne = ["(0,0)","(0,1)","(1,1)","(1,2)","(2,2)","(2,3)","(3,3)","(3,4)","(4,4)","(4,5)","(5,5)","(4,5)","(5,6)","(6,6)","(6,7)","(7,7)","(7,8)","(7,9)","(6,9)","(6,10)","(5,10)","(5,11)","(4,11)","(4,12)","(3,12)","(3,13)","(2,13)","(2,14)","(1,14)"];//28 tiles

//twisty -- var levelOne = ["(1,0)","(1,1)","(1,2)","(1,3)","(1,4)","(2,4)","(3,4)","(3,3)","(3,2)","(3,1)","(4,1)","(5,1)","(5,2)","(5,3)","(5,4)","(5,5)","(5,6)","(6,6)","(7,6)","(7,5)","(7,4)","(7,3)","(7,2)","(7,1)","(8,1)","(9,1)","(9,2)","(9,3)","(9,4)","(9,5)","(9,6)","(9,7)","(9,8)","(8,8)","(7,8)","(6,8)","(5,8)","(4,8)","(3,8)","(2,8)","(1,8)","(0,8)","(0,9)","(0,10)","(0,11)","(1,11)","(2,11)","(3,11)","(4,11)","(5,11)","(5,12)","(5,13)","(4,13)","(3,13)","(2,13)","(1,13)","(1,14)"];//56 tiles

//var levelOne = ["(5,0)","(5,1)","(4,1)","(4,2)","(3,2)" ,"(2,3)","(3,3)","(2,4)","(1,4)","(1,5)","(0,5)","(0,6)","(0,7)","(1,7)","(2,7)","(2,6)","(3,6)","(4,6)","(5,6)", "(6,6)","(7,6)","(8,6)","(8,7)","(8,8)","(8,9)","(8,10)","(7,10)","(6,10)","(5,10)","(5,9)","(4,9)","(3,9)","(3,10)","(2,10)","(1,10)","(1,11)","(1,12)","(2,12)","(3,12)","(3,13)","(4,13)","(5,13)","(5,12)","(6,12)","(7,12)","(8,12)","(8,13)","(9,13)","(9,14)"];//45 tiles


// THIS FILE DEALS WITH THE CLASSES FOR THE GAME OBJECTS
// THIS AREA ADDRESSES THE TOWER
function Tower(name, fireRate, damage, range, cost, x, y, id){
    this.name = name;
    this.fireRate = fireRate;
    this.damage = damage;
    this.cost = cost;
    this.range = range;
	this.x = x;
	this.y = y;
	this.id = id;
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
		if(ticks > 10){
			//previousTick = new Date().getTime();
			//console.log("speed:"+enemy.speed);
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
		return {type : enemy.type, health: enemy.health, speed : enemy.speed, direction : enemy.direction, x : x, y : y, id: enemy.id, starttime: enemy.starttime};
		
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
		try{
			return gameGrid.pathTiles[pos].nextDirection;
		}catch(err){
			console.log("enemy off board");
			lives --;
			 
			var elem = document.getElementById(enemy.id);
			if(elem !=null){
				elem.parentNode.removeChild(elem);
				deadenemies++;
			}
			return "delete";
		}
}

// THIS AREA ADDRESSES THE GAME
var Game = function(){
  this.enemies = [];
  this.passedTime = 0;
  this.previousTick=new Date().getTime();
  this.fps = 30;
  this.wave = 0;
 

	this.initEnemies = function(wave){
		console.log("wave:"+wave);
		var numenemies = 5;
		this.enemies = [];
		var $div = document.getElementById("levelWaveDisplay");
  		$div.innerHTML = "<p>Wave: " + this.wave + "/" + 15+"</p>";
		for(var i = 0; i < numenemies; i++){
			var starttilex= parseInt(levelOne[0].substr(1,2))*TILE_H;//-TILE_H*.5;
			var starttiley= parseInt(levelOne[0].substr(3,4))*TILE_W;
			//var en = new Enemy("", 100, 100, 1, "RIGHT", starttiley,starttilex);
			var en = {type : "", health: 100+(25*wave), speed : 1, direction : "RIGHT", x : starttilex, y : starttiley, id:("enemy"+idnum), starttime:5};
			idnum ++;
    		this.enemies.push(en);
    		
		}
	}
	
	this.displayCredits = function(){
  		var $div = document.getElementById("creditDisplay");
  		//console.log("This is credit display: " + $div.innerHTML);
  		$div.innerHTML =  ("Credits: " + money);
  		//console.log("This is credit display: " + $div.innerHTML);
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
			if(this.enemies[enemy].direction != "delete"){
				var myElem = document.getElementById(this.enemies[enemy].id);
				if (myElem === null){
					var newTowerDiv = document.createElement("div");
					newTowerDiv.setAttribute("id",this.enemies[enemy].id);
					newTowerDiv.setAttribute("class","mapzone"); 
					newTowerDiv.style.left = this.enemies[enemy].y+200 + "px";
					newTowerDiv.style.top = this.enemies[enemy].x+200 + "px";
					//newTowerDiv.style.backgroundImage = "url('http://www.placecage.com/40/40')";
					if(this.enemies[enemy].direction === "DOWN"){
						newTowerDiv.style.backgroundImage = "url('/img/foe/frontwalk.gif')";
					}else if(this.enemies[enemy].direction === "UP"){
						newTowerDiv.style.backgroundImage = "url('/img/foe/backwalk.gif')";
					}else if(this.enemies[enemy].direction === "RIGHT"){
						newTowerDiv.style.backgroundImage = "url('/img/foe/rightwalk.gif')";
					}else if(this.enemies[enemy].direction === "LEFT"){
						newTowerDiv.style.backgroundImage = "url('/img/foe/leftwalk.gif')";
					}
					newTowerDiv.style.backgroundRepeat = "no-repeat";
					newTowerDiv.style.backgroundPosition = "center";
					document.body.appendChild(newTowerDiv);
				}else{
					myElem.style.left= this.enemies[enemy].y+200;
					myElem.style.top = this.enemies[enemy].x+200;
					if(this.enemies[enemy].direction === "DOWN"){
						myElem.style.backgroundImage = "url('/img/foe/frontwalk.gif')";
					}else if(this.enemies[enemy].direction === "UP"){
						myElem.style.backgroundImage = "url('/img/foe/backwalk.gif')";
					}else if(this.enemies[enemy].direction === "RIGHT"){
						myElem.style.backgroundImage = "url('/img/foe/rightwalk.gif')";
					}else if(this.enemies[enemy].direction === "LEFT"){
						myElem.style.backgroundImage = "url('/img/foe/leftwalk.gif')";
					}
				}
			}
		}
	}

	this.tick = function(me, grid){
		//console.log("tick");
		me.moveEnemies(me);
		me.shootTowers(grid);
		me.drawEnemies();
	}
	
	this.getThis = function(){
		return this;
	}

	this.moveEnemies = function(me){
		numticks++;
		if (numticks>(this.enemies.length-1)*100) numticks =(this.enemies.length-1)*100;
		for (var i= 0; i< 1+Math.floor(numticks/100); i++){
  		//for (var enemy in this.enemies){
  			var nextdir = "";
  			if(this.enemies[i].direction !="delete"){
  				nextdir = checkDirection(this.enemies[i]);
  			}else{
  				nextdir = "delete";
  			}
  			this.enemies[i].direction =nextdir;
  			if(nextdir != "delete"){
  				this.enemies[i] = moveEnemy(this.enemies[i], this.passedTime );
  			}else{
  				if (deadenemies==this.enemies.length){
  					this.wave ++;
  					me.initEnemies(this.wave);
  					numticks = 0;
  					deadenemies = 0;
  					break;
  				}
  			}
  			//this.enemies[enemy] = checkDirection(this.enemies[enemy]);
  			//this.enemies[enemy].checkDirection();
  			//this.enemies[enemy].move(this.passedTime);
  			//stuff
  		}
	}
	

	this.shootTowers = function(grid){
		towerticks++;
		if(towerticks==100){
			towerticks = 0;
  			for (var tower in grid.towers){
  				//for (var enemy in this.enemies){
  				for(var i = 0; i<this.enemies.length; i++){
  					var distance = Math.sqrt(Math.pow(this.enemies[i].x-(grid.towers[tower].x*TILE_W),2)+Math.pow(this.enemies[i].y-(grid.towers[tower].y*TILE_W),2));
  					console.log("enemy x,y:"+this.enemies[i].x+","+this.enemies[i].y)
  					console.log("tower x,y"+(grid.towers[tower].x*TILE_W)+","+(grid.towers[tower].y*TILE_W))
  					console.log("dis:"+distance);
  					if(distance<150&&this.enemies[i].direction!="delete"){
  						//this.enemies[enemy].health -= grid.towers[tower].damage;
  						this.enemies[i].health -=100;
  						this.setTowerGif(grid.towers[tower], this.enemies[i]);
  						if(this.enemies[i].health<= 0){
  							this.enemies[i].direction= "delete";
							var elem = document.getElementById(this.enemies[i].id);
							if(elem !=null){
								elem.parentNode.removeChild(elem);
								deadenemies++;
								money+=25;
								newGame.displayCredits();
							}
  						}
  						i = this.enemies.length;
  					}
  				}
  			}
		}
	}
	
	this.setTowerGif = function(tower, enemy){
		var offsety = enemy.y-tower.y*TILE_H;
		var offsetx = enemy.x-tower.x*TILE_W;
		var degrees = Math.atan2(offsety,-offsetx)*(180/Math.PI);
		if(degrees<0) degrees = 360-degrees;
		if(degrees>360) degrees = degrees%360;
		var myElem = document.getElementById(tower.id);
		console.log("tname:"+tower.name);
		console.log("degrees:"+degrees);
		var increment = 180/16;
		if(tower.name =="fastTurret"){
			console.log("got here");
			if(degrees>22.5&&degrees<77.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/fastturret/sprite_4.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/fastturret/sprite_6.png')";
				}
			}else if(degrees>77.5&&degrees<112.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/fastturret/sprite_3.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/fastturret/sprite_7.png')";
				}
			}else if(degrees>112.5&&degrees<157.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/fastturret/sprite_2.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/fastturret/sprite_8.png')";
				}
			}else if(degrees>157.5&&degrees<202.5){
				myElem.style.backgroundImage = "url('/img/fastturret/sprite_1.png')";
			}else{
				myElem.style.backgroundImage = "url('/img/fastturret/sprite_5.png')";
			}
		}else if(tower.name =="tower"){
			console.log("got here");
			if(degrees>22.5&&degrees<77.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/turret/sprite_6.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/turret/sprite_4.png')";
				}
			}else if(degrees>77.5&&degrees<112.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/turret/sprite_7.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/turret/sprite_3.png')";
				}
			}else if(degrees>112.5&&degrees<157.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/turret/sprite_8.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/turret/sprite_2.png')";
				}
			}else if(degrees>157.5&&degrees<202.5){
				myElem.style.backgroundImage = "url('/img/turret/sprite_1.png')";
			}else{
				myElem.style.backgroundImage = "url('/img/turret/sprite_5.png')";
			}
		}else if(tower.name =="goldTurret"){
			console.log("got here");
			if(degrees>22.5&&degrees<77.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/goldturret/sprite_6.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/goldturret/sprite_4.png')";
				}
			}else if(degrees>77.5&&degrees<112.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/goldturret/sprite_7.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/goldturret/sprite_3.png')";
				}
			}else if(degrees>112.5&&degrees<157.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/goldturret/sprite_8.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/goldturret/sprite_2.png')";
				}
			}else if(degrees>157.5&&degrees<202.5){
				myElem.style.backgroundImage = "url('/img/goldturret/sprite_1.png')";
			}else{
				myElem.style.backgroundImage = "url('/img/goldturret/sprite_5.png')";
			}
		}else if(tower.name =="slowTurret"){
			console.log("got here");
			if(degrees>22.5&&degrees<77.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/slowturret/60/sprite_6.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/slowturret/60/sprite_4.png')";
				}
			}else if(degrees>77.5&&degrees<112.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/slowturret/60/sprite_7.png')";
				}else{
					myElem.style.backgroundImage = "url('/slowturret/60/sprite_3.png')";
				}
			}else if(degrees>112.5&&degrees<157.5){
				if(enemy.y<tower.y*TILE_H){
					myElem.style.backgroundImage = "url('/img/slowturret/60/sprite_8.png')";
				}else{
					myElem.style.backgroundImage = "url('/img/slowturret/60/sprite_2.png')";
				}
			}else if(degrees>157.5&&degrees<202.5){
				myElem.style.backgroundImage = "url('/img/slowturret/60/sprite_5.png')";
			}else{
				myElem.style.backgroundImage = "url('/img/slowturret/60/sprite_1.png')";
			}
		}
	}
	
}


var whichTowerObj = function(type,x,y){
if(type == "tower"){
	var newTowerObj = new Tower(type,regTowerObj.fireRate,regTowerObj.damage,regTowerObj.range,regTowerObj.cost,x,y);
	return newTowerObj;
}
else if(type == "slowTurret"){
	var newTowerObj = new Tower(type,slowTowerObj.fireRate,slowTowerObj.damage,slowTowerObj.range,slowTowerObj.cost,x,y);
	return newTowerObj;
}
else if(type == "fastTurret"){
	var newTowerObj = new Tower(type,fastTowerObj.fireRate,fastTowerObj.damage,fastTowerObj.range,fastTowerObj.cost,x,y);
	return newTowerObj;
}
else if(type == "goldTurret"){
	var newTowerObj = new Tower(type,goldTowerObj.fireRate,goldTowerObj.damage,goldTowerObj.range,goldTowerObj.cost,x,y);
	return newTowerObj;
}
}

var whichTowerBgImg = function(type){
if(type == "tower"){
	return "url('/img/turret/sprite_1.png')";
}
else if(type == "slowTurret"){
	return "url('/img/slowturret/60/sprite_5.png')";
}
else if(type == "fastTurret"){
	return "url('/img/fastturret/sprite_1.png')";
}
else if(type == "goldTurret"){
	return "url('/img/goldturret/sprite_1.png')";
}
}
var towerPlaceLogic = function(){
	clickedTile = this.id;
	console.log(clickedTile);
	var newTowerObj = whichTowerObj(clickedTower,gameGrid.grid[clickedTile].locationX,gameGrid.grid[clickedTile].locationY);
	if(gameGrid.grid[clickedTile.substring(0,5)]){
	if(newTowerObj.cost > money){
	turnCursorOff();
	alert("Sorry you don't have enough money");
	}
	else if((gameGrid.grid[clickedTile.substring(0,5)].hasTower == true || (gameGrid.towers[clickedTile] != null)) &&  $("body").hasClass("cursor_change") && (newTowerObj.cost <= money)){
	turnCursorOff();
	alert("Sorry there is a tower there");
	}
	else if((gameGrid.grid[clickedTile.substring(0,5)].hasTower == false) &&  $("body").hasClass("cursor_change") && (newTowerObj.cost <= money)){
		var newTowerDiv = document.createElement("div");
		newTowerDiv.setAttribute("id",(clickedTile + "_T"));
		newTowerObj.id = newTowerDiv.getAttribute("id");
		newTowerDiv.setAttribute("class","mapzone"); //remove hidden here and run if you want to see the prelim. map idea (not going to use the strange level format seen below however)
		newTowerDiv.style.left = (TILE_H*(gameGrid.grid[clickedTile].locationY)+200) + "px";
		newTowerDiv.style.top = (TILE_W*(gameGrid.grid[clickedTile].locationX)+200) + "px";
		gameGrid.towers[clickedTile] = newTowerObj; 
		console.log(gameGrid.towers[clickedTile]); //array of tower objects indexed at location on grid
		gameGrid.grid[clickedTile].hasTower = true;
		gameGrid.grid[clickedTile].towerType = clickedTower;
		console.log(gameGrid.grid[clickedTile]); //updated grid tile to reflect having tower 
		turnCursorOff();
		newTowerDiv.style.backgroundImage = whichTowerBgImg(clickedTower);
		newTowerDiv.style.backgroundRepeat = "no-repeat";
		newTowerDiv.style.backgroundPosition = "center";
		newTowerDiv.addEventListener("click",towerPlaceLogic);
		document.body.appendChild(newTowerDiv);
		money -= newTowerObj.cost;
		newGame.displayCredits();
	}
	}
	else if(gameGrid.grid[clickedTile.substring(0,6)]){
	if(newTowerObj.cost > money){
	turnCursorOff();
	alert("Sorry you don't have enough money");
	}
	else if((gameGrid.grid[clickedTile.substring(0,6)].hasTower == true || (gameGrid.towers[clickedTile] != null)) &&  $("body").hasClass("cursor_change") && (newTowerObj.cost <= money)){
	turnCursorOff();
	alert("Sorry there is a tower there");
	}
	else if((gameGrid.grid[clickedTile.substring(0,6)].hasTower == false) &&  $("body").hasClass("cursor_change") && (newTowerObj.cost <= money)){
		var newTowerDiv = document.createElement("div");
		newTowerDiv.setAttribute("id",(clickedTile + "_T"));
		newTowerObj.id = newTowerDiv.getAttribute("id");
		newTowerDiv.setAttribute("class","mapzone"); //remove hidden here and run if you want to see the prelim. map idea (not going to use the strange level format seen below however)
		newTowerDiv.style.left = (TILE_H*(gameGrid.grid[clickedTile].locationY)+200) + "px";
		newTowerDiv.style.top = (TILE_W*(gameGrid.grid[clickedTile].locationX)+200) + "px";
		gameGrid.towers[clickedTile] = newTowerObj; 
		console.log(gameGrid.towers[clickedTile]); //array of tower objects indexed at location on grid
		gameGrid.grid[clickedTile].hasTower = true;
		gameGrid.grid[clickedTile].towerType = clickedTower;
		console.log(gameGrid.grid[clickedTile]); //updated grid tile to reflect having tower 
		turnCursorOff();
		newTowerDiv.style.backgroundImage = "url('http://www.placecage.com/30/30')";
		newTowerDiv.style.backgroundRepeat = "no-repeat";
		newTowerDiv.style.backgroundPosition = "center";
		newTowerDiv.addEventListener("click",towerPlaceLogic);
		document.body.appendChild(newTowerDiv);
		money -= newTowerObj.cost;
		newGame.displayCredits();
	}
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
	clickedTower = this.id;
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
newGame.displayCredits();
newGame.initEnemies(wave);
//newGame.run();
//fieldNameElement.innerHTML = "My new text!";
var me =newGame.getThis();
setInterval(function() { newGame.tick(me,gameGrid) }, 1000 / newGame.fps);
