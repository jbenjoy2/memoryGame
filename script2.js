const gameContainer = document.getElementById('game');
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
let correct = document.getElementById('correct');
let incorrect = document.getElementById('incorrect');
let win = document.getElementById('win');
const COLORS = [ 'red', 'blue', 'green', 'orange', 'purple', 'red', 'blue', 'green', 'orange', 'purple' ];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);

		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
function handleCardClick(event) {
	if (noClicking) {
		return;
	} //can't click this
	if (event.target.classList.contains('flipped')) {
		return;
	} //already flipped over/a match, don't click again

	let cardChoice = event.target;
	console.log(cardChoice.classList);
	cardChoice.style.backgroundColor = cardChoice.classList[0]; //chang bkg color of clicked card

	//match logic
	if (!card1 || !card2) {
		//if there is either a card 1 or a card 2 set do the following
		cardChoice.classList.add('flipped');
		card1 = card1 || cardChoice; //if there is no card one, make it card choice, if there is, keep it as is!
		card2 = card1 === cardChoice ? null : cardChoice; //make sure either this is first or second card
	}

	if (card1 && card2) {
		//check if both cards are set and do the following, i.e two cards have been clicked at this point
		noClicking = true; //don't click anymore objects here!

		let check1 = card1.className;
		let check2 = card2.className; //check for an actual full match of flipped status and color choice

		if (check1 === check2) {
			//match
			cardsFlipped += 2;
			correct.play();
			card1.removeEventListener('click', handleCardClick);
			card2.removeEventListener('click', handleCardClick); //no more click events on these items
			card1 = null;
			card2 = null; //reset card status for next turn
			noClicking = false; //allow general clicking for next turn
		} else {
			//no match
			incorrect.play();
			setTimeout(function() {
				card1.classList.remove('flipped');
				card2.classList.remove('flipped'); //flip em over
				card1.style.backgroundColor = '';
				card2.style.backgroundColor = ''; //clear styles again
				card1 = null;
				card2 = null; //reset card status for next turn
				noClicking = false; //allow general clicking for next turn
			}, 1000);
		}
	}
	if (cardsFlipped === COLORS.length) {
		win.play();
		setTimeout(function() {
			if (!alert('YOU WIN!!')) {
				window.location.reload();
			}
		}, 400);
	}
}

// when the DOM loads
createDivsForColors(shuffledColors);
