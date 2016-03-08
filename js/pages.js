var pages = ['welcome','home', 'instruction','play'];


var currentPageIndex = 0;

var showWelcome = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 0;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
    display_Welcome_Screen();
    
};

var showMainMenu = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 1;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showInstruction = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 2;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showPlayGame = function(){
  var oldIndex = currentPageIndex;
    currentPageIndex = 3;
    document.getElementById(pages[oldIndex]).classList.add('hidden');
    document.getElementById("tower").classList.remove('hidden');
    //document.getElementById(pages[currentPageIndex]).classList.remove('hidden'); 
};

var display_Welcome_Screen = function(){
  var $div = document.getElementById("welcome")
    $div.innerHTML = '';
    var $p = document.createElement('p');
    var text = "Welcome to Apple Vs FBI";
    $p.innerHTML = text;
    $div.appendChild($p);  
};


var appStart = function(){
    currentPageIndex = 0;

    document.getElementById("mainMenu").addEventListener('click',showMainMenu);
    document.getElementById("playButton").addEventListener('click',showPlayGame);
    document.getElementById("instruct").addEventListener('click',showInstruction);   
    // document.getElementById("nextInstruction").addEventListener('click',showMainMenu);   
    document.getElementById("insMainMenu").addEventListener('click',showMainMenu);
    
    // document.getElementById("publishPost").addEventListener('click',createBlogPost);   
};

document.addEventListener('DOMContentLoaded', appStart);