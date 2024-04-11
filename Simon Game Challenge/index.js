let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).on("keydown",function(){
if(!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started = true;
}   
})



$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnwser(userClickedPattern.length-1);
})

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("level "+level);

    let randomNumber = Math.floor(Math.random()* 4);

    let randomChosenColor = buttonColours[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColor);
}


function playSound(name){
    let audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    },100);

}

function checkAnwser(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }else{    
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    },200);
   

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
    }
  }


  function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }