$(document).ready(initializeApp);
// global variable is a variable that outside of the scope
var first_card_clicked=null;
var second_card_clicked=null;
var total_possible_matches=9;
var timeOut=null;

var matches=0;
var attempts=0;
var accuracy=0;
var games_played=0;



function initializeApp(){
    addClickHandlers();
}



function addClickHandlers(){
    $('.hiddenDivContainer').on('click','.closeModal',closeModal);
    $('.game-area').on('click','.card',card_clicked);
    $('.game-area').on('click','.card',beenClicked);
    $('.game-area').on('click','.card',display_stats);
    $('.createdButton').on('click', '.reset', resetGame);

}


function closeModal(){
    $('.hiddenDivContainer').addClass('hide');
}

function beenClicked(){
    $(this).addClass('beenclicked');
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
    accuracy=0;
    matches=0;
    attempts=0;
}

function resetGame(){
    // console.log('The button reset has been clicked');
    games_played++;
    // console.log('games played',games_played);

    reset_stats();
    display_stats();
    $('div.back ').show(); //reset all the cards
    $('div.beenclicked').removeClass('beenclicked');
    $('.headerText').text('Match The Cards!');
    first_card_clicked=null;
    second_card_clicked=null;

    // call the randomizeCards function
    randomizeCards();
}


function randomizeCards(){
    var pictures=[
        'images/battlestarGalactica.jpg',
        'images/bears.jpg',
        'images/beats.jpg',
        'images/DwightandMose.jpg',
        'images/DwightandMoseFarm.jpg',
        'images/dwightBobblehead.jpg',
        'images/DwigthElf.jpg',
        'images/DwigthKrimpus.jpg',
        'images/jello.jpg'];

    pictures = pictures.concat(pictures); // concat can arrays together

    var frontImages = $('.front>img'); // gives an array of the images
    var imageIndex = 0;


    while(pictures.length){
        var randomNumIndex=Math.floor(Math.random()*pictures.length);

        var currentPic=pictures[randomNumIndex];
        pictures.splice(randomNumIndex,1);

        $(frontImages[imageIndex]).attr('src', currentPic); // from tha array call the next value and put it in the src
        imageIndex++;
    }
    // the randomizedArray was created
}




function card_clicked(){

    $(this).find('.back').hide();
    //this is the card that was clicked and we want to find the one that was clicked with the class of back and apply the hide class to that

    // var ans=$('.card').hasClass('beenclicked');
    // console.log('the class beenclikded? T or F',ans);

    if($(this).hasClass('beenclicked')){
        return;
    }


   if(first_card_clicked === null){
        first_card_clicked=$(this);
        //console.log('first card',first_card_clicked)
   }
   else if(second_card_clicked === null){
       second_card_clicked=$(this);
       //console.log('second card',second_card_clicked);
       attempts++;
       //console.log('attempts',attempts);
       //console.log('matches',matches);

       if(first_card_clicked.find('.front img').attr('src') === second_card_clicked.find('.front img').attr('src')){
           //console.log('they match')

           //match_counter++;
           matches++;
           //console.log('matches',matches);



           first_card_clicked=null;
           second_card_clicked=null;


            if(matches===total_possible_matches){
                    $('.headerText').text('You have won!');
            }
       }
       else{
           //console.log('they dont match')
           timeOut = setTimeout(timerAddBack,2000);
       }
       accuracy=(matches/attempts)*100;
       accuracy=accuracy.toFixed(2);
       accuracy=accuracy+'%';
      // console.log('accuracy',accuracy);
   }
   else{
       if(timeOut!==null){clearTimeout(timeOut);}
       timerAddBack();
       first_card_clicked=$(this);
   }
}







//have an object that stores the information
        // var cardInfo={
       //   'images/bears.jpg': 'link',
        //  'images/beats.jpg:  'link',
        //    ....}
// when there is a match i want to display a video giving back story to the face of the card
        //if there is a match between the two cards
            //go to a new page that displays the video
                //first_card_clicked.find('.front img').attr('src') will give the images/bears.jpg or whatever it is



// sound board to look up
// idiot




//function display modal

/*

when the page is loaded i want to call the function, onload

function alertFunction(){
    var message='Welcome, to Schrute Farms. The object of the game is to match all the cards';
    alter(message);
}

add the image to the document and hide it
when the modal is showing then the image should display
when the modal is closed then the image should go away
have the image be outside of the page
*/




/*function alertFunction(){
    var message='Welcome, to Schrute Farms. \nThe object of the game is to match all the cards.';
    $('.hiddenImage').removeClass('hiddenImage');
    alert(message);
} */


