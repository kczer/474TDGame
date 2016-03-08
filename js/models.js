// THIS FILE DEALS WITH THE CLASSES FOR THE GAME OBJECTS
// THIS AREA ADDRESSES THE TOWER
function Tower(name,firerate,cost){
    this.name = name;
    this.rate = firerate;
    this.cost = cost;
    this.sell = this.updateSellValue();
    this.damage = this.initDamageValue();
};

Tower.prototype.updateCost = function(newCost){
  this.cost += newCost;
  this.updateSellValue();
};

Tower.prototype.updateSellValue = function(){
  this.sell = Math.floor((this.cost / 2));  
};

Tower.prototype.updateFireRate = function(newRate){
  this.rate = newRate;  
};

Tower.prototype.initDamageValue = function(){
     // The 10 is a placeholder value
    // This will be changed to allow for Type/name to determine damage value
    return name * 10;
};

Tower.prototype.updateDamage = function(newDamage){
  this.damage = newDamage;  
};

// THIS AREA ADDRESSES THE ENEMY(FBI)
function Enemy(type){
    this.type = type;
    this.health = this.initHealth();
    this.damage = this.setDamage(type);
};
    
Enemy.prototype.initHealth = function(){
    this.health = 100;
}

Enemy.prototype.setDamage = function(enemType){
    // The 10 is a placeholder value
    // This will be changed to allow for enemy type to determine damage value
    return enemType * 10;
}    
    
Enemy.prototype.updateHealth = function(healthdamage){
    this.health -= healthdamage;  
};

// THIS AREA ADDRESSES THE GAME
function Game(level, wave){
  this.level = level;
  this.wave = wave;
  this.credits = this.initCredit(level,wave);
  this.Enemies = this.initEnemies(level,wave);
};

Game.prototype.initEnemies = function(level, wave){
  var enemies = [];
  
  enemies.push(anenem);
  
  return enemies;
};

Game.prototype.initCredit = function(level,wave){
    // The 10 is a placeholder value
    // This will be changed to allow for enemy type to determine damage value
    // (level,wave)
    return  250;
};

Game.prototype.upgradeCredits = function(spent){
  this.credits -= spent;  
};

Game.prototype.earnedCredits = function(earn){
  this.credits += earn;  
};

// THIS AREA ADDRESSES THE GAME
function Base(){
    // This value can be changed later on
    this.health = 100;
    // Location will be based on map design and the path
    // this.location
}

Base.prototype.updateHealth = function(enemDamage){
    this.health -= enemDamage;  
};

