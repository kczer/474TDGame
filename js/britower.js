var $atower;
var i=1;
 
$(document).ready(function(){

    var Tower = function(name,firerate,cost){
        this.name = name;
        this.rate = firerate;
        this.cost = cost;
        //this.sell = this.updateSellValue();
        //this.damage = this.initDamageValue();

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
            else{
                $atower.css("background-image", "url('/img/turret2/sprite_1.png')");
                $('#bg').append($atower);
            }
    
        }
        
        

        
           
    }
    
    
//execute
var tower1 = new Tower("basic", 0, 3);   
    tower1.drawTower();

var tower2 = new Tower("gold", 8, 6);
    tower2.drawTower();
    
var tower3 = new Tower("other", 3, 10);
    tower3.drawTower();  
});

