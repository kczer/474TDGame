var testTower = $('#tower');
var towerChosen = false;

var turnCursorOn = function(e){
    $("body").toggleClass("cursor_change");
    testTower.off("click", turnCursorOn);
    $("body").on("click", turnCursorOff);
    towerChosen = true;
    e.stopImmediatePropagation();
}

var turnCursorOff = function(){
    if(towerChosen = true){
    $("body").toggleClass("cursor_change");
    $("body").off("click", turnCursorOff);
    testTower.on("click", turnCursorOn);
    towerChosen = false;
    }
}

testTower.on("click", turnCursorOn);


    