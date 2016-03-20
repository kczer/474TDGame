var pages = ['home', 'instruction','gameObjects', 'paused'];
// 'welcome',
var credits = 100;
var level = 1;
var wave = 0;
var waveMax = 15;
var currentPageIndex = 0;
var mapWidth = 10;
var mapHeight = 15;

var normalTower = ["url('http://www.placecage.com/30/30')", 100];
var fastTower = ["fast", 70];
var slowTower = ["slow", 50];
var damageTower = ["damage", 150];

var Towers = [normalTower, fastTower,slowTower,damageTower];


// var showWelcome = function(){
//   var oldIndex = currentPageIndex;
//     currentPageIndex = 0;
//     document.getElementById(pages[oldIndex]).classList.add('hidden');
//     document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
//     display_Welcome_Screen();
    
// };

var showMainMenu = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 0;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
  hideGrid(mapWidth,mapHeight);
  document.getElementById("tower").classList.add('hidden');
  display_Welcome_Screen();
};

var showInstruction = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 1;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showPlayGame = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 2;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');

    // document.getElementById("tower").classList.remove('hidden');
    showGrid();
    display_Credits();
    display_Wave();
    display_last_Wave();
    //display_Towers();
    document.getElementById("tower").classList.remove('hidden');
    document.getElementById("slowTurret").classList.remove('hidden');
    document.getElementById("fastTurret").classList.remove('hidden');
    document.getElementById("goldTurret").classList.remove('hidden');
    showGrid(mapWidth,mapHeight);
    // document.getElementById("tower").classList.remove('hidden');
    //document.getElementById(pages[currentPageIndex]).classList.remove('hidden'); 
};
    // };

var pauseGame = function(){
  // This function pauses the game elements and clears the screen and include the Text Pause
  
  var oldIndex = currentPageIndex;
    currentPageIndex = 3;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
    // display_Credits();
    // display_LevelWave();
    hideGrid(mapWidth,mapHeight);
    document.getElementById("tower").classList.add('hidden');
    //document.getElementById(pages[currentPageIndex]).classList.remove('hidden'); 
};

var resumeGame = function(){
    resumeGameInit();
    showPlayGame();
};

var resumeGameInit = function(){
  
};

var display_Welcome_Screen = function(){
  // var $div = document.getElementById("titleScreen");
  //   $div.innerHTML = '';
  //   var $h1 = document.createElement('h1');
  //   var text = "Welcome to Apple Vs FBI";
  //   $h1.innerHTML = text;
  //   $div.appendChild($h1);  
};

var display_Credits = function(){
  var $div = document.getElementById("creditDisplay");
  $div.innerHTML = '';
  var $p = document.createElement('p');
  var text = "Credits: " + credits;
  $p.innerHTML = text;
  $div.appendChild($p);
};


var display_last_Wave = function(){
var $div = document.getElementById("lastWaveDisplay");
$div.innerHTML = '';
if(wave == waveMax){
  var $p = document.createElement('p');
  var text = "Final Wave";
  $p.innerHTML = text;
  $div.appendChild($p);
}
};

var display_Wave = function(){
  var $div = document.getElementById("levelWaveDisplay");
  $div.innerHTML = '';
  // var $p = document.createElement('p');
  // var levelText = "Level: " + level;
  // $p.innerHTML = levelText;
  
  var $p1 = document.createElement('p');
  var waveText = "Wave: " + 0 + "/" + waveMax;
  $p1.innerHTML = waveText;
  
  // $div.appendChild($p);
  $div.appendChild($p1);
};

var display_Towers = function(){
  var $div = document.getElementById("towerSelection");
  $div.innerHTML = '';
  Towers.forEach(function(aTower){
    var $TowerCont = document.createElement('div');
    var $TowerDiv = document.createElement('div');
    // $TowerDiv.classList.add(image-Background:aTower[0]);
    $TowerDiv.classList.add('towerPlace');
    var $TowerCost = document.createElement('div');
    $TowerCost.innerHTML = aTower[1];
    $TowerCost.classList.add('towerPlace');
    $TowerCont.classList.add('towerPlace');
    $TowerCont.appendChild($TowerDiv);
    $TowerCont.appendChild($TowerCost);
    $div.appendChild($TowerCont);
  })
};

var hideGrid = function(x,y){
  for(var j = 0; j < x; j++)
	  {
	   	for(var i = 0; i < y; i++)
		  {
		    var pos = "(" + j + "," + i + ")"; //gives us our position for these cells as a coordinate
		    var isTower = document.getElementById(pos+"_T");
		    if(isTower)
		    {
		      isTower.classList.add('hidden');
		    }
		     document.getElementById(pos).classList.add('hidden');
		  }
	  }
}
var showGrid = function(x,y){
  for(var j = 0; j < x; j++)
	  {
	   	for(var i = 0; i < y; i++)
		  {
		    var pos = "(" + j + "," + i + ")"; //gives us our position for these cells as a coordinate
		    var isTower = document.getElementById(pos+"_T");
		    if(isTower)
		    {
		      isTower.classList.remove('hidden');
		    }
		    var pos = "(" + j + "," + i + ")"; //gives us our position for these cells as a coordinate
		    document.getElementById(pos).classList.remove('hidden');
		  }
	  }
}
var appStart = function(){
    currentPageIndex = 0;
    display_Welcome_Screen();
    // document.getElementById("mainMenu").addEventListener('click',showMainMenu);
    document.getElementById("playButton").addEventListener('click',showPlayGame);
    document.getElementById("instruct").addEventListener('click',showInstruction);   
    // document.getElementById("nextInstruction").addEventListener('click',showMainMenu);   
    document.getElementById("insMainMenu").addEventListener('click',showMainMenu);
    document.getElementById("pause").addEventListener('click',pauseGame);
    document.getElementById("quit").addEventListener('click',showMainMenu);
    document.getElementById("resume").addEventListener('click',resumeGame);
    document.getElementById("pauseQuit").addEventListener('click',showMainMenu);
    
};

document.addEventListener('DOMContentLoaded', appStart);