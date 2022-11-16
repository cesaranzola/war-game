const deckId = [];

function handleClick() {
	fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
		.then((res) => res.json())
		.then((data) => deckId.push(data.deck_id));
}

document.getElementById('mainbtn').addEventListener('click', handleClick);

console.log(deckId);
