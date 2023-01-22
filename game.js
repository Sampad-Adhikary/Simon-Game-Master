var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function (e) {
    if(started == false && e.key == "Enter"){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
        $("body").removeClass("game-over");  
        $("#level-title").css("color","#FEF2BF");                        
    }
  });

$(".btn").click(function () { 
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    var last = parseInt(userClickedPattern.length-1);
    checkAnswer(last);
    
});

function nextSequence(){
    level += 1;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
    
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(currentLevel+1 == gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            },1000);
        }
    }
    else{
        wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over !!!, Press Enter to Restart.");
        $("#level-title").css("color","white");
        started = false;
        level = 0;
    }
}
