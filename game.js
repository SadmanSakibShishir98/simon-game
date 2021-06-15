
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickPattern=[];
var gamePattern = [];
var level=0;
var started=false;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started=true;
    
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/ Stack over flow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  

  
};
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  

  checkAnswer(userClickPattern.length-1);

});


function checkAnswer(CurrentLevel){
  if(gamePattern[CurrentLevel]==userClickPattern[CurrentLevel]){
    console.log("success");
    if (userClickPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game over, your score is: "+ level+ "  Press Any Key To Restart");
    startOver();
  }

}

function playSound(name){
//3. Use Google/Stack overflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name){
  
  $("#"+ name).addClass("pressed");
  setTimeout(function(){
    $("#"+ name).removeClass("pressed");
  }, 100);

}

function startOver(){
  level=0;
  gamePattern=[];
  userClickPatterns=[];
  started=false;
}