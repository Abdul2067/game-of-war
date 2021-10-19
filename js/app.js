/*-------------------------------- Constants --------------------------------*/

const   deck = ["d14","d12","d13","d11","d10","d09","d08","d07","d06","d05","d04","d03","d02","h14","h12","h13","h11","h10","h09","h08","h07","h06","h05","h04","h03","h02","c14","c12","c13","c11","c10","c09","c08","c07","c06","c05","c04","c03","c02","s14","s12","s13","s11","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

/*---------------------------- Variables (state) ----------------------------*/

let playerOnePlayableDeck, playerOneCollectedCards, playerTwoPlayableDeck, playerTwoCollectedCards, playerOneVsCard, playerTwoVsCard, isWinner

/*------------------------ Cached Element References ------------------------*/

plyOneCollEl = document.querySelector("#player-one-collected")
plyTwoCollEl = document.querySelector("#player-two-collected")
plyOnePlayEl = document.querySelector("#player-one-playable")
plyTwoPlayEl = document.querySelector("#player-two-playable")
plyOneVsEl = document.querySelector("#player-one-vs-card")
plyTwoVsEl = document.querySelector("#player-two-vs-card")
displayMessage = document.querySelector("#message")

/*----------------------------- Event Listeners -----------------------------*/

plyOnePlayEl.addEventListener("click", handleClick)
plyTwoPlayEl.addEventListener("click", handleClickTwo)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  playerOnePlayableDeck = []
  playerTwoPlayableDeck = []
  playerOneCollectedCards = []
  playerTwoCollectedCards = []
  isWinner = null

  splitDeck() 
}

function splitDeck() {
  let half = Math.ceil(deck.length / 2)

  playerOnePlayableDeck = deck.slice(0, half)

  playerTwoPlayableDeck = deck.slice(-half)
}

function checkValid() {
  if(playerOneVsCard && playerTwoVsCard) {

    vsCard()
  }
}


function handleClick() {
  if(playerOnePlayableDeck.length > 0 && playerOneVsCard === undefined) {

    let randomIdx = Math.floor(Math.random()*playerOnePlayableDeck.length)

    let cardPicked = playerOnePlayableDeck.splice(randomIdx, 1)

    playerOneVsCard = cardPicked[0]

    render(cardPicked)
    checkValid()
  }
}

function render(cardPicked) {
  let cardToRemove = null

  if (playerOnePlayableDeck.length === 0) {
    plyOnePlayEl.classList.remove("back-blue")
    plyOnePlayEl.classList.remove("shadow")
    plyOnePlayEl.classList.add("outline")
  }
  if (playerOneVsCard) {
    plyOneVsEl.classList.remove("outline")

  }
  if (cardToRemove !== null) {
    plyOneVsEl.classList.remove(cardToRemove)
  }

  cardToRemove = cardPicked

  plyOneVsEl.classList.add(cardPicked)

}

function handleClickTwo() {

  if(playerTwoPlayableDeck.length > 0 && playerTwoVsCard === undefined) {

    let randomIdxTwo = Math.floor(Math.random()*playerTwoPlayableDeck.length)

    let cardPickedTwo = playerTwoPlayableDeck.splice(randomIdxTwo, 1)

    playerTwoVsCard = cardPickedTwo[0]
    renderTwo(cardPickedTwo)
    checkValid()
    
  }
}

function renderTwo(cardPickedTwo) {
  let cardToRemoveTwo = null

  if (playerTwoPlayableDeck.length === 0) {
    plyTwoPlayEl.classList.remove("back-blue")
    plyTwoPlayEl.classList.remove("shadow")
    plyTwoPlayEl.classList.add("outline")
  }
  if (playerTwoVsCard) {
    plyTwoVsEl.classList.remove("outline")

  }
  if (cardToRemoveTwo !== null) {
    plyTwoVsEl.classList.remove(cardToRemoveTwo)
  }

  cardToRemoveTwo = cardPickedTwo

  plyTwoVsEl.classList.add(cardPickedTwo)

}


function vsCard() {
 let playerOneValue = parseInt(playerOneVsCard.slice(1))

 let playerTwoValue = parseInt(playerTwoVsCard.slice(1))

  if(playerOneValue > playerTwoValue) {

    playerOneCollectedCards.push(playerOneVsCard, playerTwoVsCard)

  } else if(playerOneValue < playerTwoValue) {

    playerTwoCollectedCards.push(playerOneVsCard, playerTwoVsCard)

  }

  cleanUpVs()
}

function cleanUpVs() {
    setTimeout(function() {
      if(playerOneCollectedCards.length > 0){

      plyOneCollEl.classList.remove("outline")
      plyOneCollEl.classList.add("back-blue")
      plyOneCollEl.classList.add("shadow")
      plyOneVsEl.classList.remove(playerOneVsCard)
      plyTwoVsEl.classList.remove(playerTwoVsCard)
      plyOneVsEl.classList.add("outline")
      plyTwoVsEl.classList.add("outline")
      }
      if(playerTwoCollectedCards.length > 0) {

      plyTwoCollEl.classList.remove("outline")
      plyTwoCollEl.classList.add("back-blue")
      plyTwoCollEl.classList.add("shadow")
      plyTwoVsEl.classList.remove(playerTwoVsCard)
      plyOneVsEl.classList.remove(playerOneVsCard)
      plyOneVsEl.classList.add("outline")
      plyTwoVsEl.classList.add("outline")
      }

      playerOneVsCard = undefined
      playerTwoVsCard = undefined
    }, 1500)
}

function collAndPlaySwap() {
  if(playerOnePlayableDeck === []) {
    playerOnePlayableDeck.push(playerOneCollectedCards)
  }
  if(playerTwoPlayableDeck === []) {
    playerTwoPlayableDeck.push(playerTwoCollectedCards)
  }
}

// function isWar() {
//  let playerOneValue = parseInt(playerOneVsCard.slice(1))

//  let playerTwoValue = parseInt(playerTwoVsCard.slice(1))

//  if(playerOneValue === playerTwoValue) {

//  }
// }

// function getWinner() {
//   if(playerOnePlayableDeck === [] && playerOneCollectedCards === []) {
//     displayMessage.textContent = "Congrats Player 2 You Won!!"
//   }
//   if(playerTwoPlayableDeck === [] && playerTwoCollectedCards === []) {
//     displayMessage.textContent = "Congrats Player 1 You Won!!"
//   }
// }