var swordL,enemy,fruit,f1,f2,f3,f4,e,swordI,fruitGroup,enemyGroup;
var Knife_sound,gameover,gameOver_sound,r;
var PLAY = 1;
var END = 0;
var gamestate = 1;
var score = 0;

function preload(){
  createCanvas(600,600);
  swordI = loadImage("sword.png");
  e = loadAnimation("alien1.png","alien2.png");
  f1 = loadImage("fruit1.png");
  f2 = loadImage("fruit2.png");
  f3 = loadImage("fruit3.png");
  f4 = loadImage("fruit4.png");
  gameover = loadImage("gameover.png");
  gameOver_sound = loadSound("gameover.mp3");
  Knife_sound = loadSound("knifeSwooshSound.mp3");
}

function setup(){
  fruitGroup = new Group();
  enemyGroup = new Group();
  swordL = createSprite(40,200,20,20);
  swordL.addImage(swordI);
  swordL.debug = false;

}
function draw(){
  background("lightblue");
 text("score :" + score,350,20);
  swordL.scale = 0.6;
  enemies();
  fruits();
  
  if (gamestate === PLAY){
swordL.y = World.mouseY;
swordL.x = World.mouseX;   
if (swordL.isTouching(fruitGroup)){
score = score+1;
fruitGroup.destroyEach();
  Knife_sound.play();
}
    
if (swordL.isTouching(enemyGroup)){
  gameOver_sound.play();
gamestate = END;
}
  }else if (gamestate === END){
    swordL.addImage(gameover);
    swordL.scale = 2;
    swordL.x = 200;
    swordL.y = 200;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    }
  
  drawSprites();
}
function fruits(){
  if (World.frameCount%80 == 0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    r = Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(f1);
    }else if(r ==2){
      fruit.addImage(f2);
    }else if(r == 3){
      fruit.addImage(f3);
    }else if (r == 4){
      fruit.addImage(f4);
    }
    fruit.y = Math.round(random(50,340));
     r = Math.round(random(1,2))
    if (r === 1){
     fruit.x = 0;
  fruit.velocityX = (7+score/4);
    }else if(r == 2){
      fruit.x = 400;
       fruit.velocityX = -(7+score/4);
    }
   
    fruit.setLifetime = 200;
    
    fruitGroup.add(fruit);
  }
}
function enemies(){
  if (World.frameCount%200 == 0){
    enemy = createSprite(400,200,20,20);
    enemy.addAnimation("moving",e);
    enemy.y = Math.round(random(100,300));
    if (r === 1){
     enemy.x = 0;
  enemy.velocityX = (8+score/10);
    }else if(r == 2){
      enemy.x = 400;
       enemy.velocityX = -(8+score/10);
    }
    enemy.setLifetime = 200;
    
    enemyGroup.add(enemy);
  }
}
