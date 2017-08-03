// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);
    this.menu.intialize();
    this.showFlashcardScreen = this.showFlashcardScreen.bind(this);
    document.addEventListener('deck-selected', this.showFlashcardScreen);
    this.showResultsScreen = this.showResultsScreen.bind(this);
    document.addEventListener('deck-done', this.showResultsScreen);
    this.startOver = this.startOver.bind(this);
    document.addEventListener('start-over', this.startOver);
    this.currentDeckTitle ='';
    this.continueDeck = this.continueDeck.bind(this);
    document.addEventListener('continue', this.continueDeck);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
  }

  showFlashcardScreen(event) {
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement, event.detail.deckTitle);
    this.currentDeckTitle = event.detail.deckTitle;

    this.menu.hide();
    this.flashcards.show();
    //console.log(event.detail.deckTitle);
  }


  showResultsScreen(event) {
    this.flashcards.hide();
    this.results.show(event.detail.right, event.detail.wrong);
  }

  startOver(event) {
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement, this.currentDeckTitle);
    this.results.hide();
    this.flashcards.show();
  }

  continueDeck(event) {
    this.results.hide();
    this.flashcards.redo();
    this.flashcards.show();
    //this.flashcards.redo();
  }
}
