$(document).ready(initializeApp);

// global variable is a variable that outside of the scope
var first_card_clicked=null;
var second_card_clicked=null;
var total_possible_matches=2;
var match_counter=0;
var timeOut=null;


function initializeApp(){
    addClickHandlers();
}


function addClickHandlers(){

    $('.game-area').on('click','.card',card_clicked); //want the back to be hidden
    $('.game-area').on('click','.card',beenClicked); //want the back to be hidden
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

       if(first_card_clicked.find('.front img').attr('src') === second_card_clicked.find('.front img').attr('src')){
           //console.log('they match')

           match_counter++;
           first_card_clicked=null;
           second_card_clicked=null;

            if(match_counter===total_possible_matches){
                    $('.headerText').text('You have won!');
            }
       }
       else{
           //console.log('they dont match')
           timeOut = setTimeout(timerAddBack,2000);
       }
   }
   else{
       if(timeOut!==null){clearTimeout(timeOut);}
       timerAddBack();
       first_card_clicked=$(this);
   }

}


// if(firt card==nul){
        // first card assigned}
//else if(second card ==null){
            // assign second card
            // work done for comparsion goes in here }
//else{
//
//  timerAddBack
// }



// when the card is clicked add on the line with class .card add .beenClicked
        //add the class $(this).addClass('.beenClicked');
// in the card_clicked function
    //find the class .beenClicked with .hasClass()
        //T: return
        // F: continue with the stuff