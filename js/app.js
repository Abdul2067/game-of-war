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
lightDarkBtn = document.querySelector("#light-dark-button")
body = document.querySelector("body")

/*----------------------------- Event Listeners -----------------------------*/

plyOnePlayEl.addEventListener("click", handleClick)
plyTwoPlayEl.addEventListener("click", handleClickTwo)
lightDarkBtn.addEventListener("click", toggleLightDark)

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

  let random = deck.sort(() => 0.5 - Math.random())

  let half = Math.ceil(random.length / 2)

    playerOnePlayableDeck = random.slice(0, half)
    
    playerTwoPlayableDeck = random.slice(-half)
    

    // console.log(playerOnePlayableDeck)
    // console.log(playerTwoPlayableDeck)
  }

function checkValid() {
  if(playerOneVsCard && playerTwoVsCard) {

    vsCard()
  }
}


function handleClick() {
  if(playerOnePlayableDeck.length > 0 && playerOneVsCard === undefined) 
  
  {
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
    plyOnePlayEl.classList.remove("back-red")
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
  
  if(playerTwoPlayableDeck.length > 0 && playerTwoVsCard === undefined) 
  
  {
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
    plyTwoPlayEl.classList.remove("back-red")
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

   } else if (playerOneValue === playerTwoValue) {
    isWar()
  }
  cleanUpVs()
}

function cleanUpVs() {
    setTimeout(function() {
      if(playerOneCollectedCards.length > 0){
        plyOneCollEl.classList.remove("outline")
        plyOneCollEl.classList.add("back-red")
        // plyOneCollEl.classList.add("shadow")
        plyOneVsEl.classList.remove(playerOneVsCard)
        plyTwoVsEl.classList.remove(playerTwoVsCard)
        plyOneVsEl.classList.add("outline")
        plyTwoVsEl.classList.add("outline")
      }
      if(playerTwoCollectedCards.length > 0) {
        plyTwoCollEl.classList.remove("outline")
        plyTwoCollEl.classList.add("back-red")
        // plyTwoCollEl.classList.add("shadow")
        plyTwoVsEl.classList.remove(playerTwoVsCard)
        plyOneVsEl.classList.remove(playerOneVsCard)
        plyOneVsEl.classList.add("outline")
        plyTwoVsEl.classList.add("outline")
      }
      collAndPlaySwap()

      playerOneVsCard = undefined
      playerTwoVsCard = undefined
    }, 500)
}

function collAndPlaySwap() {

  if(playerOnePlayableDeck.length < 1) {
    playerOnePlayableDeck = playerOneCollectedCards
    playerOneCollectedCards = []
    cleanSwap()
  }
  if(playerTwoPlayableDeck.length < 1) {
    playerTwoPlayableDeck = playerTwoCollectedCards
    playerTwoCollectedCards = []
    cleanSwap()
  }
}

function cleanSwap() {
  if(playerOnePlayableDeck.length > 0) {
    plyOnePlayEl.classList.add("back-red")
    plyOnePlayEl.classList.add("shadow")
    plyOnePlayEl.classList.remove("outline")
    plyOneCollEl.classList.remove("back-red")
    plyOneCollEl.classList.add("outline")
    plyTwoCollEl.classList.remove("shadow")
  }
  if(playerTwoPlayableDeck.length > 0) {
    plyTwoPlayEl.classList.add("back-red")
    plyTwoPlayEl.classList.add("shadow")
    plyTwoPlayEl.classList.remove("outline")
    plyTwoCollEl.classList.remove("back-red")
    plyTwoCollEl.classList.add("outline")
    plyTwoCollEl.classList.remove("shadow")
  }
  
}

// function renderIsWar() {
//   let cardToRemoveTwo = null

//   if (playerTwoVsCard) {
//     plyTwoVsEl.classList.remove("outline")
//   }
//   if (cardToRemoveTwo !== null) {
//     plyTwoVsEl.classList.remove(cardToRemoveTwo)
//   }
//   cardToRemoveTwo = cardPickedTwo

//   plyTwoVsEl.classList.add(cardPickedTwo[4])
// }

function isWar() {
  let oneVsCard = playerOnePlayableDeck.splice(0, 4)
  let twoVsCard = playerTwoPlayableDeck.splice(0, 4)

  oneVsCard.unshift(playerOneVsCard)
  twoVsCard.unshift(playerTwoVsCard)
  console.log(oneVsCard)
  console.log(twoVsCard)

  playerOneVsCard = oneVsCard
  playerTwoVsCard = twoVsCard
  console.log(playerOneVsCard)
  console.log(playerTwoVsCard)

  let playerOneValue = parseInt(playerOneVsCard[4].slice(1))
  let playerTwoValue = parseInt(playerTwoVsCard[4].slice(1))
  console.log(playerOneValue)
  console.log(playerTwoValue)

  if(playerOneValue > playerTwoValue) {
    playerOneCollectedCards.push(...playerOneVsCard, ...playerTwoVsCard)
    console.log(playerOneCollectedCards)

  } else if(playerOneValue < playerTwoValue) {
    playerTwoCollectedCards.push(...playerOneVsCard, ...playerTwoVsCard)
    console.log(playerTwoCollectedCards)

   }
   cleanUpVs()
}

// function cleanUpIsWar() {

// }

// function getWinner() {
//   if(playerOnePlayableDeck.length === 0 && playerOneCollectedCards === 0) {
//     displayMessage.textContent = "Congrats Player 2 You Won!!"
//   }
//   if(playerTwoPlayableDeck === 0 && playerTwoCollectedCards === 0) {
//     displayMessage.textContent = "Congrats Player 1 You Won!!"
//   }
// }

 function toggleLightDark() {
   body.className = body.className === "light" ? "" : "light"
 }

function checkDarkPref() {
  if(
    window.matchMedia("(perfers-color-scheme:dark)").matches && 
    body.className !== "dark"
    ){
      toggleLightDark()
    }
}

checkDarkPref()