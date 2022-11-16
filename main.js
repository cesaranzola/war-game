let deckId;
const imgContainer = document.getElementById('images');

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
}

function drawCard() {
	if (!deckId) {
		handleClick();
		setTimeout(() => {
			fetch(
				`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
			)
				.then((res) => res.json())
				.then((data) => {
					render(data);
				});
		}, 500);
	}
}

document.getElementById('mainbtn').addEventListener('click', handleClick);
document.getElementById('draw').addEventListener('click', drawCard);
