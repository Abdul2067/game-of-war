/*-------------------------------- Constants --------------------------------*/
// Switched the A,K,Q,J to number values 14,13,12,11 in css and JS Array

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

// console.log(plyOnePlayEl)
// console.log(plyOneVsEl)
// console.log(plyTwoVsEl)
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
  playerOneVsCard = []
  playerTwoVsCard = []
  isWinner = null

  splitDeck()
}

function splitDeck() {
  let half = Math.ceil(deck.length / 2)
  playerOnePlayableDeck = deck.slice(0, half)
  playerTwoPlayableDeck = deck.slice(-half)

  // console.log(playerTwoPlayableDeck)
  // console.log(playerOnePlayableDeck)
}


function handleClick() {
  // console.log(plyOnePlayEl)
  // console.log(playerOnePlayableDeck)
  // console.log(plyTwoPlayEl)
  if(playerOnePlayableDeck.length > 0) {
    let randomIdx = Math.floor(Math.random()*playerOnePlayableDeck.length)
    let cardPicked = playerOnePlayableDeck.splice(randomIdx, 1)
    playerOneVsCard.push(cardPicked)
    render(cardPicked)
    vsCard()
    // console.log(playerOneVsCard)
  }
}

function render(cardPicked) {
  if (playerOnePlayableDeck.length === 0) {
    plyOnePlayEl.classList.remove("back-blue")
    plyOnePlayEl.classList.remove("shadow")
    plyOnePlayEl.classList.add("outline")
  }
  if (playerOneVsCard.length === 1) {
    plyOneVsEl.classList.remove("outline")

  }
  if (playerOneVsCard.length > 1) {
    
    plyOneVsEl.classList.remove(cardToRemove)
    // console.log(cardToRemove)
  }
  cardToRemove = cardPicked

  plyOneVsEl.classList.add(cardPicked)
  // console.log(plyOneVsEl)

}

function handleClickTwo() {

  if(playerTwoPlayableDeck.length > 0) {
    // console.log(playerTwoPlayableDeck)
    let randomIdxTwo = Math.ceil(Math.random()*playerTwoPlayableDeck.length)
    // console.log(randomIdx)
    let cardPickedTwo = playerTwoPlayableDeck.splice(randomIdxTwo, 1)
    // console.log(cardPicked)
    playerTwoVsCard.push(cardPickedTwo)

    renderTwo(cardPickedTwo)
    vsCard()
    
  }
}

function renderTwo(cardPickedTwo) {
  if (playerTwoPlayableDeck.length === 0) {
    plyTwoPlayEl.classList.remove("back-blue")
    plyTwoPlayEl.classList.remove("shadow")
    plyTwoPlayEl.classList.add("outline")
  }
  if (playerTwoVsCard.length === 1) {
    plyTwoVsEl.classList.remove("outline")

  }
  if (playerTwoVsCard.length > 1) {
    plyTwoVsEl.classList.remove(cardToRemoveTwo)
    // console.log(cardToRemoveTwo)
  }
  cardToRemoveTwo = cardPickedTwo

  plyTwoVsEl.classList.add(cardPickedTwo)
  // console.log(plyTwoVsEl)

}


function vsCard() {
  console.log("PLAYER ONE VS CARD: ", playerOneVsCard)
  console.log("PLAYER ONE VS CARD AT 0: ", playerOneVsCard[0])
  console.log("PLAYER ONE VS CARD AT 0 AT 0: ", playerOneVsCard[0][0])
  console.log("PLAYER Two VS CARD: ", playerTwoVsCard)
  console.log("PLAYER Two VS CARD AT 0: ", playerTwoVsCard[0])
  console.log("PLAYER Two VS CARD AT 0 AT 0: ", playerTwoVsCard[0][0])
 let playerOneValue = parseInt(playerOneVsCard[0][0].slice(1))
 let playerTwoValue = parseInt(playerTwoVsCard[0][0].slice(1))
  console.log(playerOneValue)
  console.log(playerTwoValue)
  // playerOneVsCard.splice(0, 1)
  // playerOne = playerOneVsCard
//   parseInt(playerOneVsCard)
// console.log(parseInt(playerOneVsCard))
}