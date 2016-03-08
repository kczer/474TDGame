var $atower;
 
$(document).ready(function(){

    var Tower = function(name,firerate,cost){
        this.name = name;
        this.rate = firerate;
        this.cost = cost;
        //this.sell = this.updateSellValue();
        //this.damage = this.initDamageValue();

        var self = this;
    
        
        
        this.drawTower = function(){
            $atower= $(document.createElement('div')).attr('id', 'tower');
            $atower.css("left", this.posx+"px");
            $atower.css("top ", this.posy+"px");
            $atower.css("background-image", "url('img/tower/sprite_1.png')");
            
            $('#bg').append($atower);
    
        }
        
        
        this.moveTower = function(){
            var i=1;
            if(i<=8){
               $atower.css("background-image", "url('img/tower/sprite_'"+i+".png)");
               console.log("hi");
               i++;
               setTimeout(function(){self.moveTower()},100);
               
           }
           else{
               console.log("bye");
               return 0;
           }
             
        }
        
         
    
        
    }
    
    
//execute
var Tower1 = new Tower("aye", 0, 3);   
    Tower1.drawTower();
    Tower1.moveTower(); 

    
//update
// var run = function(){
     
//     window.setTimeout(run, 20);

//     }

// run();

});
