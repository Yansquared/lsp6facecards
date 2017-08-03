// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement, right, wrong) {
    this.containerElement = containerElement;
    this.startOver = this.startOver.bind(this);
  }

  show(r, w) {
    this.containerElement.classList.remove('inactive');
    const a = document.querySelector('#results .correct');
    a.textContent = r + ' right';
    const b = document.querySelector('#results .incorrect');
    b.textContent = w + ' wrong';
    const percent = Math.round((r/(r + w))*100);
    const p = document.querySelector('#results .percent');
    p.textContent = percent;

    // got some wrong, continue. if all right, start over
    const c = document.querySelector('#results .continue');
    c.removeEventListener('pointerup', this.startOver);
    c.removeEventListener('pointerup', this.continueDeck);
    if(w > 0) {
      c.textContent = 'Continue';
      c.addEventListener('pointerup', this.continueDeck);
    }else{
      c.textContent = 'Start Over?';
      c.addEventListener('pointerup', this.startOver);
    }
    const m = document.querySelector('#results .to-menu');
    m.addEventListener('pointerup', this.menu);

  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  continueDeck(event) {
    document.dispatchEvent(
      new CustomEvent('continue'));
  }

  startOver(event) {
    document.dispatchEvent(
      new CustomEvent('start-over'));
  }

  menu(event) {
    window.location.reload(true);
  }
}
