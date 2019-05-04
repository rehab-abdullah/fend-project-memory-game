"use strict";
/*
 * Create a list that holds all of your cards
 */
var listcard =['fa-diamond','fa-anchor','fa-cube','fa-leaf','fa-bomb','fa-bicycle','fa-paper-plane-o','fa-bolt'];
listcard = [...listcard, ...listcard];
var displayMove = document.querySelector('.moves');
var time = document.querySelector('.time');
var score = document.querySelector('.stars');
var positionStar =score.querySelectorAll('li');
var restart = document.querySelector('.restart');
var openCards = [];
var moves;
var timer;
var fscore;
var sec = 0, min = 0;
var interval;


function generateCard(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function startGame() {
    var deck = document.querySelector('.deck');
    var cardTHML = shuffle(listcard).map(function(card) {
        return generateCard(card);
    });

    deck.innerHTML = cardTHML.join('');


    moves=0;
    displayMove.innerText = moves;
    positionStar.forEach(function(e){
    	e.style="color:gold";});
    stopTimer();
}
    
    
startGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function matcingCard() {
  var allcards = document.querySelectorAll('.card');
  allcards.forEach(function(card)  {
      card.addEventListener('click', function(e) {
          var opened = card.classList.contains('open');
          var showed = card.classList.contains('show');
          var matched = card.classList.contains('match');
 	      if (!opened && !showed && !matched) {
 		     openCards.push(card);
 		     card.classList.add('open');
 		     card.classList.add('show');

 		     if (openCards.length == 2 ) {
 		     	/*if the cards do match*/
 		         if (openCards[0].dataset.card == openCards[1].dataset.card) {
                     matching.call();
                    }
                 else {
                /*if the cards do not match */ 
                 openCards[0].classList.add('wrong');
                 openCards[1].classList.add('wrong');
 				 unmatching.call();
                 }
                
                 function matching() {
                 	 
                        openCards[0].classList.remove('wrong');
                        openCards[0].classList.add('open');
                        openCards[0].classList.add('show');
                        openCards[0].classList.add('match');

                        openCards[1].classList.remove('wrong');
                        openCards[1].classList.add('open');
                        openCards[1].classList.add('show');
                        openCards[1].classList.add('match');

                        openCards = [];
                    }
                 function unmatching() {
                     setTimeout(function() {
                         openCards.forEach(function(card) {
                         card.classList.remove('open');
                         card.classList.remove('show');
                         card.classList.remove('wrong')
                         });

                         openCards = [];
                        },500);
                    }
                  /*increment the move counter*/
 			     function moveCounter() {
                      moves += 1;
 			          displayMove.innerText = moves;
                      if(moves == 1){
                         sec = 0;
                          min = 0; 
                         /*startTimer*/
                         startTimer();
                        }
                      finalScore(moves);
                    }
                 moveCounter();
                 endGame();
                }
            }
        });
    });
}
matcingCard();
/*if all cards have matched, display a message with the final score*/
function endGame() {
    var matchedCard = document.querySelectorAll('.match');
    if (matchedCard.length == 16){
       /*alert(`You are a winner!! \n you made ${moves} moves \n in ${timer} \n Stars Rating: ${fscore} Stars of 3`);
       if (confirm('you want play agin?')) {
           setTimeout("location.reload(true);",1000);
        } else {
            alert('click on restart Button to try again ');
            clearInterval(interval);
        }*/
        writeModalContent();
        toggleModal();
        
    }
}


function startTimer() {
    interval= setInterval(function(){
        timer =`${min} mins ${sec} secs `;
        time.innerText = timer;
        sec++;
        if(sec== 60){
            min++;
            sec = 0;
        }
    },1000);
}

function stopTimer() {
	min=0;
	sec=0;
	timer =`${min} mins ${sec} secs `;
    time.innerText = timer;
    clearInterval(interval);
}


function finalScore(moves) {
	if(moves >=8 && moves<=12){
		fscore=3;
	}
	if (moves > 12 && moves <= 22){
        positionStar[0].style="color:gray";
        fscore =2;
    }
    if (moves > 22) {
       positionStar[1].style="color:gray"; 
       fscore=1;  
    } 
}
function toggleModal(){
    const modal = document.querySelector(".modal__background");
    modal.classList.toggle('hide');
    clearInterval(interval);
}
function writeModalContent() {
    const content = document.querySelector("#content");
    content.innerText =`You are a winner!!\nyou made ${moves} moves\nin ${timer}\nStars Rating: ${fscore} Stars of 3`;
    clearInterval(interval);

}
toggleModal();
toggleModal();
document.querySelector(".modal__cancel").addEventListener('click',()=>{
    toggleModal();
});
document.querySelector(".modal__replay").addEventListener('click',()=>{
    setTimeout("location.reload(true);",1000);
});

restart.addEventListener('click',function() {
    stopTimer();
    startGame();
    openCards = [];
    matcingCard();
});

