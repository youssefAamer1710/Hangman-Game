const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((l) => {
	let span = document.createElement("span");
	let letter = document.createTextNode(l);
	span.appendChild(letter);
	span.className = "letter-box";
	lettersContainer.appendChild(span);
});

const words = {
	plants: [
		"apple",
		"banana",
		"orange",
		"mango",
		"strawberry",
		"carrot",
		"broccoli",
		"spinach",
		"tomato",
		"cucumber",
		"lettuce",
		"potato",
		"onion",
		"garlic",
		"cauliflower",
		"peas",
		"corn",
		"celery",
		"asparagus",
		"eggplant",
		"radish",
		"cabbage",
		"pumpkin",
		"watermelon",
		"grapes",
		"peach",
		"pear",
		"plum",
		"cherry",
		"blueberry",
		"raspberry",
		"blackberry",
		"kiwi",
	],
	animals: [
		"lion",
		"elephant",
		"giraffe",
		"zebra",
		"monkey",
		"tiger",
		"panda",
		"koala",
		"kangaroo",
		"penguin",
		"wolf",
		"bear",
		"dolphin",
		"whale",
		"cheetah",
		"gorilla",
		"crocodile",
	],
	countries: [
		"USA",
		"Japan",
		"France",
		"Egypt",
		"Brazil",
		"Germany",
		"Italy",
		"Spain",
		"Canada",
		"Australia",
		"China",
		"India",
		"Mexico",
		"Argentina",
		"South Korea",
		"United Kingdom",
		"Russia",
		"South Africa",
		"Sweden",
		"Netherlands",
		"Portugal",
		"Greece",
		"Turkey",
		"Norway",
		"Denmark",
		"Switzerland",
		"Ireland",
		"Poland",
	],
};

// Get Random Property

let allKeys = Object.keys(words);

let randomCategoryIndex = Math.floor(Math.random() * allKeys.length);
let randomKey = allKeys[randomCategoryIndex];
let randomCategory = words[randomKey];

let randomWordIndex = Math.floor(Math.random() * randomCategory.length);
// Chosen Word
let randomWord = randomCategory[randomWordIndex];

//Set Category Info
if (randomKey === "plants") {
	document.querySelector(
		".category span",
	).innerHTML = `fruits and Vegetables`;
} else {
	document.querySelector(".category span").innerHTML = randomKey;
}

// Guessing section

let lettersGuessContainer = document.querySelector(".guess");

let lettersAndSpaces = Array.from(randomWord);

lettersAndSpaces.forEach((letter) => {
	let emptySpan = document.createElement("span");
	if (letter === " ") {
		emptySpan.className = "has-space";
	}
	lettersGuessContainer.appendChild(emptySpan);
});

// Select Guessing Spans
let guessSpans = document.querySelectorAll(".guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw ELement
let theDraw = document.querySelector(".hangman-draw");

// Handle clicking a letter
document.addEventListener("click", (e) => {
	let theStatus = false;
	if (e.target.className === "letter-box") {
		e.target.classList.add("clicked");
		// get Clicked letter
		let clickedLetter = e.target.innerHTML.toLowerCase();

		let theChosenWord = lettersAndSpaces;

		// Adding the letter to the answer
		theChosenWord.forEach((wordLetter, wordIndex) => {
			if (clickedLetter === wordLetter.toLowerCase()) {
				theStatus = true;
				// Loop on All Spans
				guessSpans.forEach((span, spanIndex) => {
					if (wordIndex === spanIndex) {
						span.innerHTML = wordLetter;
					}
				});
			}
		});
		// if the letter is Wrong
		if (!theStatus) {
			wrongAttempts++;
			// Add a class to draw the HANGMANN
			theDraw.classList.add(`wrong-${wrongAttempts}`);
			// play Fail sound
			document.getElementById("fail").play();
			if (wrongAttempts === 8) {
				lettersContainer.classList.add("finished");
				endGame();
			}
		} else {
			document.getElementById("success").play();
			// Check if all letters are guessed
			let isComplete = true;
			guessSpans.forEach((span) => {
				if (span.innerHTML === "") {
					isComplete = false;
				}
			});
			if (isComplete) {
				lettersContainer.classList.add("finished");
				winGame();
			}
		}
	}
});

// End Game Function

function winGame() {
	let div = document.createElement("div");
	let divTxt = document.createTextNode(
		`Congratulations! You Won! The Word Was === ${randomWord.toUpperCase()} ===`,
	);
	div.appendChild(divTxt);
	div.className = "popup";

	// Add play again button
	let playAgainBtn = document.createElement("button");
	playAgainBtn.textContent = "Play Again";
	playAgainBtn.onclick = () => location.reload();
	div.appendChild(document.createElement("br"));
	div.appendChild(playAgainBtn);

	document.body.appendChild(div);
}

function endGame() {
	let div = document.createElement("div");
	let divTxt = document.createTextNode(
		`Game Over, The word was ${randomWord.toUpperCase()}`,
	);
	div.appendChild(divTxt);
	div.className = "popup";

	// Add play again button
	let playAgainBtn = document.createElement("button");
	playAgainBtn.textContent = "Play Again";
	playAgainBtn.onclick = () => location.reload();
	div.appendChild(document.createElement("br"));
	div.appendChild(playAgainBtn);

	document.body.appendChild(div);
}
