var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$(document).on("keydown", function(){
    if (!started){
        nextSequence();
        $("#level-title").text("Level " + level );
        started = true;
    }
});

$(".btn").on("click" ,function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1)
});


function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);

        }
    }else{
       var audio = new Audio("sounds/wrong.mp3");
       audio.play();

       $("body").addClass("game-over");

       setTimeout(function(){
        $("body").removeClass("game-over");
       },200);
       
       $("h1").text("Game Over, press any key to restart");
       
       startover();   

    }

}

function startover(){
    level = 0;
    gamePattern = [];
    started = false;

}


function nextSequence() {

    userClickedPattern = [];

    level++
    $("#level-title").text("Level " + level );

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)

}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
$("." + currentColour).addClass("pressed");
setTimeout(function(){
    $("." + currentColour).removeClass("pressed"); 
},100);

}




