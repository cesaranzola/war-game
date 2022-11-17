let deckId;
const imgContainer = document.getElementById('images');
const mainBtn = document.getElementById('mainbtn');
const draw = document.getElementById('draw');
const titlesbox = document.getElementById('titlesbox');
const remainingcards = document.getElementById('remainingcards');
const points1 = document.getElementById('points1');
const points2 = document.getElementById('points2');
let computer = 0;
let player = 0;

function handleClick() {
	fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
		.then((res) => res.json())
		.then((data) => {
			deckId = data.deck_id;
			cardsLeft(data);
			draw.disabled = false;
			titlesbox.innerHTML = scoreTitles();
			titlesbox.classList.add('d-flex');
		});
}

function render(data) {
	let html = ``;
	for (let item of data.cards) {
		html += `<div class="cardx"><img src="${item.image}" alt="Card" class="img-fluid" /></div>`;
	}
	imgContainer.innerHTML = html;
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
			if (data.remaining) {
				render(data);
				cardsLeft(data);
				addPoints(data);
			} else {
				draw.setAttribute('disabled', '');
				cardsLeft(data);

				setTimeout(() => {
					renderWinner();
				}, 500);
			}
		});
}

function addPoints(data) {
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
		computer++;
		points1.innerHTML = computer;
	} else if (card2Index > card1Index) {
		player++;
		points2.innerHTML = player;
	}
}

function renderWinner() {
	const winner =
		computer > player
			? 'The Computer Wins'
			: computer < player
			? "You're the winner"
			: "It's a tie!";
	titlesbox.classList.remove('d-flex');
	let html = `<div class="final mt-2"><h2>${winner}</h2></div>`;
	titlesbox.innerHTML = html;
}

function cardsLeft(data) {
	let html = `<h2 class="deckleft align-self-start mt-2 ms-2" id="remainingcards">
						Remaining cards: ${data.remaining}
					</h2>`;
	remainingcards.innerHTML = html;
}

function scoreTitles() {
	return `<h2 class="sdtitlecom">
							Computer:
							<span id="points1">0</span>
						</h2>
						<h2 class="sdtitleme">
							Me:
							<span id="points2">0</span>
						</h2>`;
}

mainBtn.addEventListener('click', handleClick);
draw.addEventListener('click', drawCard);
