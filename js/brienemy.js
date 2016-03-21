var $afrank;
 
$(document).ready(function(){

    var Frank = function(type, posx, posy){
       // Enemy.call(type, health, damage);
       this.type = type;
        this.posx = posx;
        this.posy = posy;
        //this.dir = dir;

        var self = this;
        
        
        this.drawFrank = function(){
            $afrank = $(document.createElement('div')).attr('id', 'frank');

            $afrank.css("position", "absolute");
            $afrank.css("left", self.posx+"px");
            $afrank.css("top ", self.posy+"px");
            $afrank.css("height", "60px");
            $afrank.css("width", "60px");
            $afrank.attr("class","damage");
            
            if (self.type == "basic"){
                $afrank.attr("class","down");
                $('#bg').append($afrank);
                console.log("i am append");
            
            }else{

                $afrank.attr("class","down2");
                $('#bg').append($afrank);
                console.log("aye");
            }
    
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
            console.log("posx: "+self.posx);
            if(self.type == "basic"){
                $afrank.attr("class","left");
            }else{
                $afrank.attr("class","left2");  
            }
           
        }
        
        this.moveUp = function(){

            self.posy-=1;
            console.log("posy: "+self.posy);   
            if(self.type == "basic"){
                $afrank.attr("class","up");
            }else{
                $afrank.attr("class","up2");  
            }
        }
        
        this.moveRight = function(){
            self.posx+=1;

            console.log("posx: "+self.posx); 
            if(self.type == "basic"){
                $afrank.attr("class","right");
            }else{
                $afrank.attr("class","right2");  
            }
        }
        
        this.moveDown = function(){

            self.posy+=1;
  
            console.log("posy: "+self.posy); 
            if(self.type == "basic"){
                $afrank.attr("class","down");
            }else{
                $afrank.attr("class","down2");  
            }
        }
    
        
    }
    
    
//execute
var frank1 = new Frank("basic", 200,100);   
    frank1.drawFrank();
    frank1.moveFrank(); 
    
var frank2 = new Frank("advanced", 300, 200);
    frank2.drawFrank();
    frank2.moveFrank(); 

});
