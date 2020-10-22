(function (window) {
  "use strict";
  // Game
  var Game = function (el, option) {
    this.el = document.getElementById(el);
    this.option = option;

    this.info_div = document.createElement("div");
    this.info_div.id = "info_div";

    // Deck
    this.deck_div = document.createElement("div");
    this.deck_div.id = "deck_div";
    this.gameDeck = new Deck(option);
    this.gameDeck.buildDeck.call(this);

    var shuffleBtn = document.createElement("button");
    shuffleBtn.innerHTML = "Shuffle";
    shuffleBtn.onclick = this.gameDeck.shuffle.bind(this);

    this.info_div.appendChild(shuffleBtn);

    this.el.appendChild(this.info_div);
    this.el.appendChild(this.deck_div);
  };
  // Deck
  var Deck = function (option) {
    this.deckData = option.data;
    this.buildDeck = function () {
      var parentFrag = document.createDocumentFragment();
      this.deck_div.innerHTML = "";
      for (var i = this.option.data.length - 1; i >= 0; i--) {
        var card = new Card();
        card.id = "card-" + i;
        card.data = this.option.data[i];
        card.buildCard(parentFrag);
      }
      this.deck_div.appendChild(parentFrag);
      this.gameDeck.stack.call(this);
    };
  };

  Deck.prototype.shuffle = function () {
    var cardsToShuffle = this.gameDeck.deckData;
    var m = cardsToShuffle.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = cardsToShuffle[m];
      cardsToShuffle[m] = cardsToShuffle[i];
      cardsToShuffle[i] = t;
    }
    this.gameDeck.deckData = cardsToShuffle;
    this.gameDeck.buildDeck.call(this);
  };

  Deck.prototype.stack = function () {
    var cards = this.deck_div.children;
    for (var i = cards.length - 1; i >= 0; i--) {
      cards[i].style.top = i + "px";
      cards[i].style.left = i + "px";
      cards[i].classList.add("stacked_card");
    }
  };

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
      var learnMore = document.createElement("a");
      learnMore.text = "Learn More";
      learnMore.href = this.data.link;
      learnMore.target = "_blank";
      var infoImage = document.createElement("img");
      infoImage.src = "images/info.svg";
      learnMore.appendChild(infoImage);
      learnMore.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      backValDiv.appendChild(learnMore);
      catDiv.innerHTML = this.data.category;

      this.cardFront.appendChild(frontValDiv);
      this.cardFront.appendChild(catDiv);
      this.cardBack.appendChild(backValDiv);

      flipDiv.appendChild(this.cardFront);
      flipDiv.appendChild(this.cardBack);

      this.cardContainer.id = this.id;
      this.cardContainer.appendChild(flipDiv);
      this.cardContainer.onclick = cardClick;
      parentFrag.appendChild(this.cardContainer);
    };
  };

  var cardClick = (function (e) {
    var counter = 0;
    return function (e) {
      e.currentTarget.classList.toggle("flip_card");
      e.currentTarget.classList.toggle("slide_over");
      e.currentTarget.style.zIndex = counter;
      counter++;
      // console.log(e.target, e.currentTarget); // what was actually clicked vs. the element with the onclick event
      // console.log(e.currentTarget.className, e.currentTarget.classList);
      // console.log(this); // same as e.currentTarget
    };
  })();

  // Discard Pile
  var DiscardPile = function () {};
  window.Game = Game;
})(window);
