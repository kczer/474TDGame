var $atower;
var $aye;
var i=1;
 
$(document).ready(function(){

    var Tower = function(name,posx, posy){
        this.name = name;
        this.posx = posx
        this.posy= posy;
        

        var self = this;
    
        this.drawTower = function(){
            $atower= $(document.createElement('div')).attr('id', 'turret');
            $atower.css("height", "60px");
            $atower.css("width", "60px");
            $atower.css("position", "absolute");
            $atower.css("left", this.posx+"px");
            $atower.css("top ", this.posy+"px");
            
            if (self.name == "basic"){
                $atower.css("background-image", "url('/img/turret/sprite_1.png')");
                $('#bg').append($atower);
                
            }
            else if(self.name == "gold"){
                $atower.css("background-image", "url('/img/goldturret/sprite_1.png')");
                $('#bg').append($atower);
                
            }
            else if (self.name == "fast"){
                $atower.css("background-image", "url('/img/fastturret/sprite_1.png')");
                $('#bg').append($atower);    
            }
            else{
                $atower.css("background-image", "url('/img/slowturret/60/sprite_1.png')");
                $('#bg').append($atower);
            }
    
        }
   
           
    };
    
    //explosion example
    $aye = $(document.createElement('div')).attr('class', 'explode');
    $('#bg').append($aye);
    
    var kill = function(){
        $aye.removeClass();
        console.log("ded");
    } 
    setTimeout(kill,950); //1025
    
    
/*execute
var tower1 = new Tower("basic", 10, 30);   
    tower1.drawTower();

var tower2 = new Tower("gold", 80, 60);
    tower2.drawTower();
    
var tower3 = new Tower("fast", 30, 10);
    tower3.drawTower(); 
    
var tower4 = new Tower("slow", 110, 20);
    tower4.drawTower(); 
  */  
});

