let buttonColours = ["red","blue","green","yellow"]

let gamePattern = []
let userClickedPattern = []

let level = 0;
let gameStarted = false;


$(document).keydown(function () {
  if (!gameStarted) {
    nextSequence();
    $("#level-title").text("level " + level);
    gameStarted = true;
  }
});


$(".btn").click(function () {
  
  let userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour)
  
  $(this).fadeOut(100).fadeIn(100);////////////////////////////////

  playSound(userChosenColour);
  animatePress(userChosenColour);
    
  console.log("after")
  console.log(gamePattern)
  console.log(userClickedPattern)
    
  checkAnswers(userClickedPattern.length-1);
}) 

function checkAnswers(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
    if (gamePattern.length === userClickedPattern.length) {
      // level++; 
      // $("h1").text("level " + level)
      setTimeout(function() {
        // $(".btn").unbind("click")
        nextSequence();
        // userClickedPattern = [];
      }, 1000); 
    }
  } else {
    let gameOver = new Audio("/sounds/wrong.mp3");
    gameOver.play();
    console.log("Game Over! Press Any Key to Restart");
    $("#level-title").text("Game Over! Press Any Key to Restart")
    userClickedPattern = [];
    gamePattern = [];
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    startOver();
  }
} 

function nextSequence() {
  userClickedPattern= [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random()*4)
  let randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour) 

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour) { 
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() { 
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = []
  gameStarted = false;
}