let deckId;
const imgContainer = document.getElementById('images');
const mainBtn = document.getElementById('mainbtn');
const draw = document.getElementById('draw');

function handleClick() {
	fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
		.then((res) => res.json())
		.then((data) => (deckId = data.deck_id));
}

function render(data) {
	let html = ``;
	for (let item of data.cards) {
		html += `<div class="cardx"><img src="${item.image}" alt="Card" class="img-fluid" /></div>`;
	}
	imgContainer.innerHTML = html;
	setWinner(data);
}

function drawCard() {
	if (!deckId) {
		handleClick();
		setTimeout(() => {
			fetchCard();
		}, 500);
	} else {
		fetchCard();
	}
}

function fetchCard() {
	fetch(
		`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
	)
		.then((res) => res.json())
		.then((data) => {
			render(data);
		});
}

function setWinner(data) {
	const cardsValues = [
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'JACK',
		'QUEEN',
		'KING',
		'ACE',
	];

	const card1Index = cardsValues.indexOf(data.cards[0].value);
	const card2Index = cardsValues.indexOf(data.cards[1].value);

	if (card1Index > card2Index) {
		console.log('The winner is the Computer!');
	} else if (card2Index > card1Index) {
		console.log("You're the winner!");
	} else {
		console.log("It's a tie!");
	}
}

mainBtn.addEventListener('click', handleClick);
draw.addEventListener('click', drawCard);
