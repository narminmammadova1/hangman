const wordList = ["BAKU", "OTTAVA", "BERLIN", "PARIS", "OSLO", "STOCKHOLM", "BERN"];
const imagesList = ["./images/baku.jfif", "./images/ottava.jfif", "./images/berlin.jfif", "./images/paris.jfif", "./images/oslo2.jfif", "./images/STOCHKOLM.jfif", "./images/BERN.jfif"];
class HangmanGame {
  constructor(wordList, imagesList) {
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.wordList = wordList;
    this.imagesList = imagesList;
    this.chance = 9;
    this.wins = 0;
    this.losses = 0;

    this.chosenWord = "";
    this.lettersInChosenWord = [];
    this.arrCorrectLetters = [];

    this.arrWrongLetters = [];
    this.lines = [];

    this.chanceDisplay = document.querySelector("#chance");
    this.words = document.querySelector("#Words");
    this.wrongLetters = document.querySelector("#wrongLetters");
    this.image = document.querySelector("#image");
    this.winsElement = document.querySelector("#wins");
    this.lossesElement = document.querySelector("#losses");
    this.refresh();
    this.attachEventListeners();
  }

  refresh() {
    const randomIndex = Math.floor(Math.random() * this.wordList.length);
    this.chosenWord = this.wordList[randomIndex];
    const chosenImage = this.imagesList[randomIndex];

    this.lettersInChosenWord = this.chosenWord.split("");
    this.lines = this.lettersInChosenWord.map(() => "_");

    this.image.setAttribute("src", chosenImage);

    this.chance = 9;
    this.chanceDisplay.innerHTML = this.chance;
    this.words.innerHTML = this.lines.join(" ");
    this.wrongLetters.innerHTML = "";

    this.arrCorrectLetters = [];
    this.arrWrongLetters = [];
  }

  isWin() {
    if (this.arrCorrectLetters.length === this.chosenWord.length) {
      alert("You win!");
      this.wins++;
      this.winsElement.innerHTML = this.wins;
      this.refresh();
    }
  }
  isLose() {
    if (this.arrWrongLetters.length === 9) {
      alert("You lose!");
      this.losses++;
      this.lossesElement.innerHTML = this.losses;
      this.refresh();
    }
  }

  startGame(e) {
    let userChoice = e.key.toUpperCase();

    if (!this.alphabet.includes(userChoice)) {
      alert("Please enter only letters");
      return;
    }

    if (this.lettersInChosenWord.includes(userChoice)) {
      for (let i = 0; i < this.lettersInChosenWord.length; i++) {
        if (this.lettersInChosenWord[i] === userChoice) {
          this.lines[i] = this.lettersInChosenWord[i];
          this.arrCorrectLetters.push(userChoice);
        }
      }
    } else {
      this.chance--;
      this.chanceDisplay.innerHTML = this.chance;
      this.arrWrongLetters.push(userChoice);
      this.wrongLetters.innerHTML = this.arrWrongLetters.join(" ");
    }

    this.words.innerHTML = this.lines.join(" ");
    this.isWin();
    this.isLose();
  }

  attachEventListeners() {
    window.addEventListener("keydown", (e) => {
      this.startGame(e);
    });
  }
}

// console.log(hangmanGame.arrCorrectLetters);

const hangmanGame = new HangmanGame(wordList, imagesList);