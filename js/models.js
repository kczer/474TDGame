// THIS FILE DEALS WITH THE CLASSES FOR THE GAME OBJECTS
// THIS AREA ADDRESSES THE TOWER
function Tower(name, fireRate, damage, cost){
    this.name = name;
    this.fireRate = fireRate;
    this.damage = damage;
    this.cost = cost;
};

Tower.prototype.upgrade = function(cost, fireRate, damage){
  this.cost += cost;
  this.fireRate = fireRate;
  this.damage = damage;
};

Tower.prototype.sell = function(){
  return Math.floor(this.cost * .8);  
};

// THIS AREA ADDRESSES THE ENEMY(FBI)
function Enemy(type, health, armor){
    this.type = type;
    this.health = health;
    this.armor = armor;
};
    
Enemy.prototype.damage = function(damage){
    this.health -= damage*((100-this.armor)/100);  
    return this.health <= 0;
};


// THIS AREA ADDRESSES THE GAME
function Game(){
  this.wave = 0;
  this.money = 500;
  this.health = 100;
  this.Enemies = this.initEnemies(wave);
};

Game.prototype.nextWave = function(){
  this.wave ++;
  this.initEnemies();
};

Game.prototype.initEnemies = function(){
  this.enemies = [];//Will be changed to dynamic function
};

Game.prototype.spendCredits = function(spent){
  this.credits -= spent;  
};

Game.prototype.earnedCredits = function(earn){
  this.credits += earn;  
};

Game.prototype.damageBase = function(){
  this.health -=1;
  return this.health <= 0;
};


