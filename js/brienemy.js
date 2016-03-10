var $afrank;
 
$(document).ready(function(){

    var Frank = function(posx, posy){
       // Enemy.call(type, health, damage);
        this.posx = posx;
        this.posy = posy;
        //this.dir = dir;

        var self = this;
        
        
        this.drawFrank = function(){
            $afrank = $(document.createElement('div')).attr('id', 'frank');
            $afrank.css("height", "150px");
            $afrank.css("width", "150px");
            $afrank.css("position", "absolute");
            $afrank.css("left", self.posx+"px");
            $afrank.css("top ", self.posy+"px");

            $afrank.css("background-image", "url('/img/frontwalk.gif')");
            
            $('#bg').append($afrank);
            console.log("i am append");
    
        }
        
        
        this.moveFrank = function(){
            $(document).keydown(function(e) {
                switch(e.which) {
                    case 37: //left
                        console.log("left");
                        self.moveLeft();
                    break;
            
                    case 38: //up
                        console.log("up");
                        self.moveUp();
                    break;
            
                    case 39: //right;
                        console.log("right");
                        self.moveRight();
                    break;
            
                    case 40: //down
                        console.log("down");
                       self.moveDown();
                    break;
            
                    default: return;
                 }
            e.preventDefault();
            });
            
        }
        
        this.moveLeft = function(){

            self.posx-=1;

            $afrank.css("background-image", "url('/img/leftwalk.gif')");
            console.log("posx: "+self.posx);
        }
        
        this.moveUp = function(){

            self.posy-=1;

            $afrank.css("background-image", "url('/img/backwalk.gif')");
            console.log("posy: "+self.posy);   
        }
        
        this.moveRight = function(){
            self.posx+=1;

            $afrank.css("background-image", "url('/img/rightwalk.gif')");
            console.log("posx: "+self.posx);   
        }
        
        this.moveDown = function(){

            self.posy+=1;

            $afrank.css("background-image", "url('/img/frontwalk.gif')");
            console.log("posy: "+self.posy);   
        }
    
        
    }
    
    
//execute
var frank1 = new Frank(200,100);   
    frank1.drawFrank();
    frank1.moveFrank(); 


});
