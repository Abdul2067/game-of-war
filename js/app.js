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
  // playerOneVsCard = []
  // playerTwoVsCard = []
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

function checkValid() {
  if(playerOneVsCard && playerTwoVsCard) {
    console.log("VALID")
    vsCard()
  }
}


function handleClick() {
  if(playerOnePlayableDeck.length > 0) {
    let randomIdx = Math.floor(Math.random()*playerOnePlayableDeck.length)
    let cardPicked = playerOnePlayableDeck.splice(randomIdx, 1)
    playerOneVsCard = cardPicked[0]
    render(cardPicked)
    checkValid()
    // vsCard()
    // console.log(playerOneVsCard)
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
    // console.log(cardToRemove)
  }
  cardToRemove = cardPicked

  plyOneVsEl.classList.add(cardPicked)
  // console.log(plyOneVsEl)

}

function handleClickTwo() {

  if(playerTwoPlayableDeck.length > 0) {
    // console.log(playerTwoPlayableDeck)
    let randomIdxTwo = Math.floor(Math.random()*playerTwoPlayableDeck.length)
    // console.log(randomIdx)
    let cardPickedTwo = playerTwoPlayableDeck.splice(randomIdxTwo, 1)
    // console.log(cardPicked)
    playerTwoVsCard = cardPickedTwo[0]
    renderTwo(cardPickedTwo)
    checkValid()
    // vsCard()
    
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
    // console.log(cardToRemoveTwo)
  }
  // if (playerTwoCollectedCards.length > 0){
  //   plyTwoCollEl.classList.remove("outline")
  // }
  cardToRemoveTwo = cardPickedTwo

  plyTwoVsEl.classList.add(cardPickedTwo)
  // console.log(plyTwoVsEl)

}


function vsCard() {
  console.log("VS CARD", playerOneVsCard, playerTwoVsCard)
  // console.log("PLAYER ONE VS CARD: ", playerOneVsCard)
  // console.log("PLAYER ONE VS CARD AT 0: ", playerOneVsCard[0])
  // console.log("PLAYER ONE VS CARD AT 0 AT 0: ", playerOneVsCard[0][0])
  // console.log("PLAYER Two VS CARD: ", playerTwoVsCard)
  // console.log("PLAYER Two VS CARD AT 0: ", playerTwoVsCard[0])
  // console.log("PLAYER Two VS CARD AT 0 AT 0: ", playerTwoVsCard[0][0])
 let playerOneValue = parseInt(playerOneVsCard.slice(1))
 let playerTwoValue = parseInt(playerTwoVsCard.slice(1))
  console.log(parseInt(playerOneVsCard.slice(1)))
  console.log(playerTwoValue)
  if(playerOneValue > playerTwoValue) {
    playerOneCollectedCards.push(playerOneVsCard, playerTwoVsCard)
    console.log("PLAYER ONE WINS", playerOneCollectedCards)
  } else if(playerOneValue < playerTwoValue) {
    playerTwoCollectedCards.push(playerOneVsCard, playerTwoVsCard)
    console.log("PLAYER TWO WINS", playerTwoCollectedCards)

  } 
  console.log(playerOneCollectedCards)
  console.log(playerTwoCollectedCards)
}