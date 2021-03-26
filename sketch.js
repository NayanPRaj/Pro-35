var balloon;
var balloonImage,backgroundImage;
var database;
var back;
var height;

function preload(){
backgroundImage=loadImage("IMAGES/back.png");
balloonImage=loadAnimation("IMAGES/hot1.png","images/hot2.png","images/hot3.png");
}

function setup(){
  database=firebase.database();
  console.log(database);
createCanvas(1500,700);

balloon=createSprite(200,200,100,100);
balloon.addAnimation("balloon",balloonImage);
balloon.scale=0.4;

var balloonPosition=database.ref('balloon/position');
balloonPosition.on("value",readPostion,showError);

}

function draw(){
  background(backgroundImage);

  

  if(keyDown(LEFT_ARROW)){
    
    updateheight(-10,0);
    
   
  }
  if(keyDown(RIGHT_ARROW)){
    updateheight(10,0);
  }
  if(keyDown(UP_ARROW)){
    
    updateheight(0,-10);
    balloon.scale=balloon.scale-0.01;
  }
  if(keyDown(DOWN_ARROW)){
   
    updateheight(0,10);
    balloon.scale=balloon.scale+0.01;
  }

  drawSprites();

  fill("black");
  text("** Use arrow key to move the hot air balloon",50,50);
  
}

function readPostion(data){
height=data.val();
balloon.x=height.x;
balloon.y=height.y;
}

function showError(){
  console.log("there is error in database");
}

function updateheight(x,y){
database.ref('balloon/position').set({
  'x':height.x+x,
  'y':height.y+y
})
}