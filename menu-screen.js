// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.selectDeck = this.selectDeck.bind(this);
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  intialize() {
    // iterates through the titles of the deck and
    // appends divs to the  html
    const currentDiv = document.querySelector('#choices');
    for (const deck of FLASHCARD_DECKS) {
      const choice = document.createElement('div');
      const content = document.createTextNode(deck['title']);
      choice.appendChild(content);
      currentDiv.appendChild(choice);
      choice.addEventListener('pointerup', this.selectDeck);

    }
  }

  selectDeck(event) {
    const deckTitle = event.currentTarget.textContent;
    const eventInfo = {
      deckTitle: deckTitle
    };
    document.dispatchEvent(
      new CustomEvent('deck-selected', {detail: eventInfo}));
  }
}
