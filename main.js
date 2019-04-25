$(document).ready(initializeApp);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var timeOut = null;

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var audioActive = false;
var soundOn = false;
var player = new Audio();



function initializeApp(){
    addClickHandlers();
    randomizeCards();
}



function addClickHandlers(){

    $('body').on('click','.header-container',closeModel);
    $('body').on('click','.game-container',closeModel);
    $('.hiddenDivContainer').on('click','.closeModel',closeModel);
    $('.game-area').on('click','.card',card_clicked);
    $('.game-area').on('click','.card',display_stats);
    $('.reset').on('click', '.reset-button', resetGame);

    $('.on-audio').on('click','.on-audio-button',enableSound);
    $('.off-audio').on('click','.off-audio-button',disableSound);
}


function enableSound(){
    soundOn = true;
}

function disableSound(){
    soundOn = false;
}


function playSound(filename,volume=1) {
    if(player.paused===false || soundOn===false){
        return;
    }

    audioActive = true;
   

    var cardInfo={
        'images/bears.jpg': {'sound': 'sounds/Bears.mp3'},
        'images/beats.jpg': {'sound': 'sounds/Beats.mp3'},
        'images/battlestarGalactica.jpg': {'sound': 'sounds/BattleStarGallactica.mp3'},
        'images/DwightandMose.jpg': {'sound': 'sounds/MoseBestFriend.mp3'},
        'images/dwightBobblehead.jpg': {'sound': 'sounds/BobbleHead.mp3'},
        'images/jello.jpg': {'sound': 'sounds/StaplerJello.mp3'},
        'images/DwightandMoseFarm.jpg': {'sound': 'sounds/DwightSchruteFarms.mp3'},
        'images/DwigthElf.jpg': {'sound': 'sounds/DwightElf.mp3'},
        'images/DwigthKrimpus.jpg': {'sound': 'sounds/DwightDutchChristmas.mp3'}
    };

    if(filename.lastIndexOf('jpg')>-1){
        $('.game-area').addClass('audioLoad');
        filename = cardInfo[filename]['sound'];
    }

    player.src = filename;
    player.volume = volume;
    player.play();


    player.onended = function() {
        audioActive = false;
        $('.game-area').removeClass('audioLoad');
    };
}


function closeModel(){
    $('.hiddenDivContainer').addClass('hide');
}


function timerAddBack(){
    first_card_clicked.find('.back').show();
    second_card_clicked.find('.back').show();

    first_card_clicked.removeClass('beenclicked');
    second_card_clicked.removeClass('beenclicked');

    first_card_clicked=null;
    second_card_clicked=null;
}



function display_stats(){
    $('div.games-played div.value').text(games_played);

    $('div.attempts div.value').text(attempts);

    $('div.accuracy div.value').text(accuracy);
}

function reset_stats(){
    accuracy=0+'%';
    matches=0;
    attempts=0;
}

function resetGame(){
     games_played++;
  

    reset_stats();
    display_stats();
    $('div.back ').show(); 
    $('div.beenclicked').removeClass('beenclicked');
    $('.headerText').text('You are brave to play again.');
    first_card_clicked=null;
    second_card_clicked=null;

    randomizeCards();
}


function randomizeCards(){
    var pictures=[
        'images/bears.jpg',
        'images/beats.jpg',
        'images/battlestarGalactica.jpg',
        'images/DwightandMose.jpg',
        'images/DwightandMoseFarm.jpg',
        'images/dwightBobblehead.jpg',
        'images/DwigthElf.jpg',
        'images/DwigthKrimpus.jpg',
        'images/jello.jpg'];

    pictures = pictures.concat(pictures); 

    var frontImages = $('.front>img'); 
    var imageIndex = 0;


    while(pictures.length){
        var randomNumIndex=Math.floor(Math.random()*pictures.length);

        var currentPic=pictures[randomNumIndex];
        pictures.splice(randomNumIndex,1);

        $(frontImages[imageIndex]).attr('src', currentPic); 
        imageIndex++;
    }
    
}




function card_clicked(){
    if(audioActive || $(this).hasClass('beenclicked')){
        return;
    }


    $(this).find('.back').hide();
    $(this).addClass('beenclicked');


   if(first_card_clicked === null){
        first_card_clicked=$(this);
   }
   else if(second_card_clicked === null){
       second_card_clicked=$(this);
       attempts++;
       
       if(first_card_clicked.find('.front img').attr('src') === second_card_clicked.find('.front img').attr('src')){
           
           matches++;
           
                
          
          //DwightSounds(first_card_clicked.find('.front img').attr('src'));
        
            playSound(first_card_clicked.find('.front img').attr('src'));
           

           first_card_clicked=null;
           second_card_clicked=null;

          

            if(matches===total_possible_matches){
                    $('.headerText').text('Sadly, you have won.');
            }
       }
       else{
           //dwigthSoundIdiot();
           playSound('sounds/dwightIdiot.mp3');
           timeOut = setTimeout(timerAddBack,2000);
       }
       accuracy=(matches/attempts)*100;
       accuracy=accuracy.toFixed(2);
       accuracy=accuracy+'%';

   }
   else{
       if(timeOut!==null){clearTimeout(timeOut);}
       timerAddBack();
       first_card_clicked=$(this);
   }
}


