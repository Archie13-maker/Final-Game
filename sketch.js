//var START= 1;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var alien, alienImg;
var ground, iGround;
var building;
var score=0;
var crash, restart;
var crashImg,restartImg;
var b1, b2, b3, b4;
var crashSound;
//var start, startImg;

function preload(){
  crashImg= loadImage("crash.png");
  restartImg= loadImage("reset.png");
  alienImg= loadImage("alien.png");
  //start= loadImage("start.png");
  b1=loadImage("building1.png");
  b2=loadImage("building2.png");
  b3=loadImage("building3.png");
  b4=loadImage("building4.png");
  crashSound=loadSound("sound.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  crash = createSprite(windowWidth/2, windowHeight-600,100,100);
  crash.addImage(crashImg);
  crash.scale=1.3;

  restart = createSprite(windowWidth/2, windowHeight-300,100,100);
  restart.addImage(restartImg);
  restart.scale=1.3;

  /*start = createSprite(windowWidth/2, windowHeight-400,100,100);
  start.addImage(restartImg);
  start.scale=1.3;*/

  alien=createSprite(windowWidth-1380,windowHeight-500,50,50);
  alien.addImage(alienImg);
  alien.scale=0.2;

  ground = createSprite(width/2,windowHeight-10,7000,20);

  iGround = createSprite(width/2,windowHeight-785,7000,5);
  iGround.visible= false;

  buildingsGroup = createGroup();
}

function draw() {
  background(40,130,203);
  
  fill(109,61,175);
  textSize(25);
  text("Score: "+ score, windowWidth-200,windowHeight-750);

  if(gameState===PLAY){

    if(keyDown("space")) {
      alien.velocityY = -12;
    }
    alien.velocityY = alien.velocityY + 1.5;
  
    ground.velocityX = -(4 + 5* score/100)
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
  score = score + Math.round(getFrameRate()/60);
  buildings();


  if(buildingsGroup.isTouching(alien)){
    crashSound.play();
    gameState=END;
  }
  crash.visible=false;
  restart.visible=false;

  alien.collide(iGround);
  alien.collide(ground);

  }

   if(gameState===END){
    crash.visible=true;
    restart.visible=true;

    ground.visible=false;
    alien.visible=false;
    buildingsGroup.destroyEach();
   // buildingsGroup.setLifetimeEach();

   alien.collide(iGround);
   alien.collide(ground);
  }

  if(mousePressedOver(restart)) {
    reset();
  }

  drawSprites();

}

function buildings(){
  if (frameCount % 30 === 0){
    var building = createSprite(windowWidth-100, windowHeight-100, 200, random(100,1150));
    building.velocityX = -(6 + score/100);
    
      var rand = Math.round(random(1,4));
    /* switch(rand) {
       case 1: building.addImage(b1);
               break;
       case 2: building.addImage(b2);
               break;
       case 3: building.addImage(b3);
               break;
       case 4: building.addImage(b4);
               break;
       default: break;
     } */
            
     building.lifetime = 300;
    
     buildingsGroup.add(building);
  }
}

function reset(){
  gameState=PLAY;
  crash.visible= false;
  restart.visible= false;
  alien.visible=true;
  ground.visible=true;
  score=0;
}