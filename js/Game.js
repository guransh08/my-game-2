class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1Img);
    car2 = createSprite(300,200);
    car2.addImage(car2Img)
    car3 = createSprite(500,200);
    car3.addImage(car3Img)
    car4 = createSprite(700,200);
    car4.addImage(car4Img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
       background(groundImg)
      image (trackImg,0,-displayHeight*6,displayWidth,displayHeight*7)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction

        x= 200 - allPlayers[plr].distance;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill ("yellow")
          ellipse(x,y,60,60);

          cars[index - 1].shapeColor = "red";
          camera.position.x = cars[index-1].x
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(keyIsDown(LEFT_ARROW)&& player.index!==null){
      player.distance=player.distance-10
      
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(frameCount%20===0){
      var obstacle=createSprite(random(200,1200),random(-displayHeight*7,displayHeight),2,2)
      obstacle.velocityY=6;
      var number =Math.round(random(1,4))
      if(number===1){
        obstacle.addImage(obs1)
  
      }else if (number===2){
        obstacle.addImage(obs2)
      }else if(number===3){
        obstacle.addImage(obs3)
      }else {
        obstacle.addImage(petrol)
      }
      obstacle.scale=0.2
  
  
  
     }
if(player.distance>6200){
  gameState=2;
}
    drawSprites();
  }
end (){
  console.log("gameEnded")


}
}
