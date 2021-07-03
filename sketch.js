//Create variables here
var dog,happyDog,database,foodS,foodStock;
var addFood,feed,feedDog,addFoods,fedTime,lastFed,foodObj;
function preload()
{
  //load images here
  d1=loadImage("images/dogImg.png");
  d2=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  var dog=createSprite(200,200);
  dog.addImage(d1);
  database=firebase.database;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodObj=new Food(lastFed,foodStock);
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
  

  
}


function draw() {  
 background(46,139,87);
 
 foodObj.display();
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });
  drawSprites();
  
  //add styles here

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

