
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var bananaGroup;
var obstacleGroup;
var score;
var survivaltime=0
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,400);
  
  if(gameState===PLAY){
         
  monkey= createSprite(80,315,20,20);
 monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
    
    monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug =false;
    
    ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  }
  
 bananaGroup = new Group();
  obstacleGroup = new Group();
  
   score=0;
  survivaltime=0;
}


function draw() {
  
background("green")
  
  if(ground.x>0){
    ground.x=ground.width/2;
  }
  if(gameState===PLAY){
    
  textSize(20);
  fill("White");
  text("Score : "+score,400,51.5);
  
  textSize(20);
  fill("White");
  survivaltime=Math.ceil(frameCount/frameRate());
  text("Survival Time : "+survivaltime,120,50);
    
  if(keyDown("space")&&monkey.y>=150){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.6;
    
  monkey.collide(ground);
     
  banana();
  obstacles ();
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score=score+1;
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  }
  if(gameState===END){
    
    ground.velocityX=0;
    
    obstacle.velocityX=0; 
   
    monkey.velocityY=monkey.velocityY+0.6;
       
    monkey.collide(ground);
    
    monkey.pause();
            
    bananaGroup.destroyEach();
    
    obstacleGroup.destroyEach()
    
    fill("White")
     textSize(20);
    text("Game Over !",225,160)
   
    textSize(20);
    fill("White")
   text("Press R to Restart",200,200);
    
    if(keyDown("R")){
    reset();
  }
  }
  
   drawSprites();
  
}
function banana(){
  
  if(frameCount%80===0){
  var banana=createSprite(410,160,10,30);
    banana.velocityX=-5;
   banana.addImage("moving",bananaImage);
   banana.scale=0.1;
    monkey.depth = banana.depth + 1;
    banana.y=Math.round(random(120,200));
    banana.lifeTime = 100
   bananaGroup.add(banana);
  }
}

function obstacles(){
  
  if(frameCount%300===0){
    obstacle=createSprite(400,325,10,40);
    obstacle.collide(ground); 
    obstacle.velocityX=-5;
    obstacle.addImage("moving",obstacleImage);
    obstacle.scale=0.1;
    obstacle.lifeTime = 100;
    obstacleGroup.add(obstacle);
    
  }
}

function reset(){
  
  gameState=PLAY;
  score=0;
  survivaltime=0;
  monkey.play();
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
}




