// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText, dragState) {
    this.containerElement = containerElement;
    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);
    this.tempfunction = dragState;

    this.drag = false;
    this.orginX = null;
    this.offsetX = 0;
    this.currentX = 0;

    this.orginY = null;
    this.offsetY = 0;
    this.currentY = 0;

    this._flipCard = this._flipCard.bind(this);
    this.flashcardElement.addEventListener('pointerup', this._flipCard);

    this.dragStart = this.dragStart.bind(this);
    this.flashcardElement.addEventListener('pointerdown', this.dragStart);

    this.dragEnd = this.dragEnd.bind(this);
    this.flashcardElement.addEventListener('pointerup', this.dragEnd);

    this.dragging = this.dragging.bind(this);
    this.flashcardElement.addEventListener('pointermove', this.dragging);
  }

  dragStart(event) {
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.drag = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    this.currentX = 0
    this.currentY = 0;
  }

  dragging(event) {
    if(!this.drag) {
      return;
    }
    event.preventDefault();
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    const translateX = this.offsetX + deltaX;
    const translateY = this.offsetY + deltaY;
    this.currentX = translateX;
    this.currentY = translateY;
    event.currentTarget.style.transition = 'transform 0s';
    event.currentTarget.style.transform = 'translateX(' + translateX + 'px) translateY(' + translateY + 'px) rotateZ(' + translateX * 0.2 + 'deg)';

    //right
    if(translateX > 150) {
      document.body.style.backgroundColor = '#97b7b7';
      this.tempfunction('right');
    //wrong
    }else if (translateX < -150){
      document.body.style.backgroundColor = '#97b7b7';
      this.tempfunction('wrong');
    } else{
      this.tempfunction('middle');
      document.body.style.backgroundColor = '#d0e6df';
    }
  }

  dragEnd(event) {
    this.offsetX += event.clientX - this.originX;
    this.offsetY += event.clientY - this.originY;
    document.body.style.backgroundColor = '#d0e6df';
    //console.log(this.currentX);
    if (this.currentX < 150 && this.currentX > -150){
      event.currentTarget.style.transform = 'translateX(0px) rotateZ( 0deg)';
      event.currentTarget.style.transition = 'transform 0.5s';
      this.orginX = null;
      this.offsetX = 0;
      this.orginY = null;
      this.offsetY = 0;
      this.drag = false;
    //swiped flashcard to the right
    } else if (this.currentX > 150) {
      const eventInfo = {
        status: 'right'
      };
      document.dispatchEvent(
        new CustomEvent('flashcard-done', {detail: eventInfo}));
    //swiped flashcard to the left
    } else if (this.currentX < -150) {
      const eventInfo = {
        status: 'wrong'
      };
      document.dispatchEvent(
        new CustomEvent('flashcard-done', {detail: eventInfo}));
    }
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');


    //changed to add images for LSP VI
    const wordSide = document.createElement('img'); //used to be 'div'
    wordSide.classList.add('flashcard');
    //wordSide.classList.add('word');
    // wordSide.textContent = frontText;
    wordSide.classList.add('face');
    wordSide.src = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    if(this.currentX !== 0) {
      return;
    }
    this.flashcardElement.classList.toggle('show-word');
  }
}
