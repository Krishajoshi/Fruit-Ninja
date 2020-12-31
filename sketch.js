var fruitsGroup;
var swordKnife;
var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;
var enemyGroup;

function preload(){
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  swordImage = loadImage("sword.png");
  gameOverImage = loadImage("gameover.png");
  alienImage = loadAnimation("alien1.png","alien2.png");
  knifeSound = loadSound("knifeSwooshSound.mp3"
)
  gameoverSound = loadSound("gameover.mp3")
}

function setup(){
 fruitsGroup = new Group();
 enemyGroup = new Group();
 swordKnife = createSprite(40,200,20,20);
 swordKnife.addImage(swordImage);
 swordKnife.scale = 0.7;
 
  
 
}

function draw()
{
 background(" lightgreen");
 if(gameState === PLAY){

   
   swordKnife.x = World.mouseX;
   swordKnife.y = World.mouseY;
   spawnEnemy();
   spawnFruits();
   
   if(fruitsGroup.isTouching(swordKnife)){
     fruitsGroup.destroyEach();
     score=score+2;
     knifeSound.play();
     }
   
 
  else{
    if(enemyGroup.isTouching(swordKnife)){
      gameState = END;
      fruitsGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitsGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      swordKnife.addImage(gameOverImage);
      gameoverSound.play();
    }
  }
 }
  
  
  

drawSprites();
text("Score:"+score,320,50);
}
function spawnEnemy(){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20)
    monster.addAnimation("moving",alienImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
    
  }
  
}
function spawnFruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    r=Math.round(random(1,4));
    if(r === 1){
      fruit.addImage(fruit1);
    } else if (r === 2) {
      fruit.addImage(fruit2);
    } else if (r === 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -7;
    fruit.setLifetime=100;
    
    position = Math.round(random(1,2))
    
    if(position==1){
      fruit.x = 400;
      fruit.velocityX=-(7+(score/4));
    }
    else{
      if(position==2){
        fruit.x=0;
        
        fruit.velocityX= (7+(score/4));
      }
    }
    
    fruitsGroup.add(fruit);
  }
  
  
}
