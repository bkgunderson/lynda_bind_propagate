(function (window) {
  // Game
  var Game = function (el, option) {
    this.el = document.getElementById(el);
    this.option = option;
    this.info_div = document.createElement("div");
    this.info_div.id = "info_div";

    //Deck
    this.deck_div = document.createElement("div");
    this.deck_div.id = "deck_div";
    this.gameDeck = new Deck(this.deck_div, option);
    this.gameDeck.buildDeck();

    this.el.appendChild(this.info_div);
    this.el.appendChild(this.deck_div);
  };
  // Deck
  var Deck = function (deck_div, option) {
    this.deckData = option.data;
    this.buildDeck = function () {
      var parentFrag = document.createDocumentFragment();
      deck_div.innerHTML = "";
      for (var i = this.deckData.length - 1; i >= 0; i--) {
        var card = new Card();
        card.id = "card-" + i;
        card.data = this.deckData[i];
        card.buildCard(parentFrag);
      }
      deck_div.appendChild(parentFrag);
    };
  };
  //    cards
  //    ----

  // Cards
  var Card = function () {
    this.id = "";
    this.data = "";
    this.cardContainer = document.createElement("div");
    this.cardContainer.className = "card_container";
    this.cardFront = document.createElement("div");
    this.cardFront.className = "card_front";
    this.cardBack = document.createElement("div");
    this.cardBack.className = "card_back";
    this.buildCard = (parentFrag) => {
      var flipDiv = document.createElement("div"),
        frontValDiv = document.createElement("div"),
        backValDiv = document.createElement("div"),
        catDiv = document.createElement("div");
      flipDiv.className = "flip";
      frontValDiv.className = "front_val";
      backValDiv.className = "back_val";
      catDiv.className = "cat_val";

      frontValDiv.innerHTML = this.data.q;
      backValDiv.innerHTML = this.data.a;
      catDiv.innerHTML = this.data.cat;

      this.cardFront.appendChild(frontValDiv);
      this.cardFront.appendChild(catDiv);
      this.cardBack.appendChild(backValDiv);

      flipDiv.appendChild(this.cardFront);
      flipDiv.appendChild(this.cardBack);

      this.cardContainer.id = this.id;
      this.cardContainer.appendChild(flipDiv);
      this.cardContainer.onclick = function (e) {
        e.currentTarget.classList.toggle("flip_card");
        e.currentTarget.classList.toggle("slide_over");
        // console.log(e.target, e.currentTarget); // what was actually clicked vs. the element with the onclick event
        // console.log(e.currentTarget.className, e.currentTarget.classList);
        // console.log(this); // same as e.currentTarget
      };
      parentFrag.appendChild(this.cardContainer);
    };
  };
  // Discard Pile
  window.Game = Game;
})(window);
