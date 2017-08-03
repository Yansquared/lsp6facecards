// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement, deck) {
    this.containerElement = containerElement;
    this.deckName = deck;
    this.show = this.show.bind(this);

    this.dragState = this.dragState.bind(this);

    //
    let deckIndex = 0;
    for (const d of FLASHCARD_DECKS) {
      if(d['title'] === deck) {
        break;
      } else {
        deckIndex ++;
      }
    }
    const pairs = FLASHCARD_DECKS[deckIndex]['words'];
    console.log(pairs);
    this.wordArray = [];
    this.defArray = [];
    this.deckSize = 0;
    for(const p in pairs) {
      // console.log(p);
      // console.log(pairs[p])
      this.wordArray.push(p);
      this.defArray.push(pairs[p]);
      this.deckSize ++;
    }
    this.randomize();

    this.deckIndex = deckIndex;

    // event listener for moving to the next flashcard
    this.status = this.status.bind(this);
    document.addEventListener('flashcard-done', this.status);

    // initialize scoreboard
    this.right = 0;
    this.wrong = 0;
    const a = document.querySelector('.status .correct');
    a.textContent = this.right + ' right';
    const b = document.querySelector('.status .incorrect');
    b.textContent = this.wrong + ' wrong';


  }

  randomize() {
    for(let i = 0; i < this.wordArray.length; i++) {
      const x = Math.round(Math.random());
      if (x === 1){
        this.wordArray.push(this.wordArray[0]);
        this.defArray.push(this.defArray[0]);
        this.wordArray.shift();
        this.defArray.shift();
      }
      console.log(this.wordArray);
      console.log(this.defArray);
    }

  }

  // callback function YAY office hours!
  dragState(state) {
    console.log(state);
    if(state === 'right') {
      const a = document.querySelector('.status .correct');
      a.textContent = this.right + 1 + ' right';
    }else if(state ==='wrong') {
      const b = document.querySelector('.status .incorrect');
      b.textContent = this.wrong + 1 + ' wrong';
    } else if (state === 'middle') {
      const a = document.querySelector('.status .correct');
      a.textContent = this.right + ' right';
      const b = document.querySelector('.status .incorrect');
      b.textContent = this.wrong + ' wrong';
    }

  }

  show() {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    const card = new Flashcard(flashcardContainer, this.wordArray[0], this.defArray[0], this.dragState);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  status(event) {
    if(event.detail.status === 'right') {
      this.right ++;
      const scoreboard = document.querySelector('.status .correct');
      scoreboard.textContent = this.right + ' right';
    }
    if(event.detail.status === 'wrong') {
      this.wrong ++;
      const scoreboard = document.querySelector('.status .incorrect');
      scoreboard.textContent = this.wrong + ' wrong';

      //add wrong word to end of arrays
      this.wordArray.push(this.wordArray[0]);
      this.defArray.push(this.defArray[0]);

    }

    //deletes first element in array
    this.wordArray.shift();
    this.defArray.shift();

    console.log(this.wordArray);
    console.log(this.defArray);


    //removes the flash card from screen
    const flashcardContainer = document.querySelector('#flashcard-container');
    flashcardContainer.innerHTML = '';

    if(this.wrong + this.right === this.deckSize) {
      const eventInfo = {
        right: this.right,
        wrong: this.wrong
      };
      document.dispatchEvent(
        new CustomEvent('deck-done', {detail: eventInfo}));
    } else {
      this.show();
    }
  }

  redo() {
    console.log(this.wordArray);
    console.log(this.defArray);
    this.wrong = 0;
    const scoreboard = document.querySelector('.status .incorrect');
    scoreboard.textContent = this.wrong + ' wrong';
    this.randomize();
  }
}
