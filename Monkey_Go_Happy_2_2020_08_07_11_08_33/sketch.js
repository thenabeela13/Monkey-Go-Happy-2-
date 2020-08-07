//Global Variables
var player, player_running;
var bananaImage, banana;
var stoneImage;
var backImage, background;
var ground, invisibleGround;
var score;
var PLAY;
var END ;

function preload(){
  
  backImage=loadImage("jungle.jpg");
  
  player_running= loadImage (
"Monkey_01.png",
"Monkey_02.png",
"Monkey_03.png",
"Monkey_04.png",
"Monkey_05.png",
"Monkey_06.png",
"Monkey_07.png",
"Monkey_08.png",
"Monkey_09.png",
"Monkey_10.png"
);
  
  bananaImage=loadImage("Banana.png");
  stoneImage=loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  backImage = createSprite(300,300,600,300);
  backImage.addImage("backImage", background );
  
  player= createSprite(550,50,40,30);
  player.addAnimation("running", player_running);
  player.scale = 0.5;
  
  ground= createSprite(200,180,400,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0
}


function draw(){
 background(255);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  
  if (gameState === PLAY){
  switch(score){
  
    case 10: player.scale=0.12;
      break;
    case 20: player.scale=0.14;
      break;
    case 30: player.scale=0.16;
      break;
    case 40: player.scale=0.18;
      break;
    default: break;
      
  }
 
    player.velocityY = player.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnBananas();
  spawnObstacles();
    
    //End the game when player is touching the obstacle
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
  else if(gameState === END){
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
    
  }
  drawSprites();
}