
var fixedColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];
var exitTime = 100;

var modeTime = 1000;

//trigger keypress function in the whole document
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);

    nextSequence();
    started = true;
  }
});

//click function in jQuery
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); //trigger the click with this, get tht value of "id"
  userClickedPattern.push(userChosenColour);// store the id of the button that got clicked

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


$(".input-group").click(function(){
  var userChosenSpeed = $("input[ name='mode'] ").val();
  if(userChosenSpeed === fast){
    modeTime = 5;
  }
  if(userChosenSpeed === normal){
    modeTime = 1000;
  }
  if(userChosenSpeed === slow){
    modeTime = 50000;
  }
});



//play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//achieve the animation result of button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, exitTime); // remove the pressed class after a 100 milliseconds
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, modeTime);

    }
  } else {
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      playSound("wrong");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, exitTime);

      startOver();
    }
}

//play the random sound when level is increased
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = []; // require the memory recall of all the buttons
  var randomNumber = Math.floor(Math.random() * 4); //0,1,2,3
  var randomChosenColour = fixedColors[randomNumber];


  playSound(randomChosenColour);//play the corresponding sound of randomly chosen color
  $("#" + randomChosenColour).fadeIn(exitTime).fadeOut(exitTime).fadeIn(exitTime);//the demonstration of certain buttons
  gamePattern.push(randomChosenColour);
}





function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}
