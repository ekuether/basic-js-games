const availableImages = [
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

const cardArray = availableImages.concat(availableImages)
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const cardsChosen = []
const cardsChosenIds = []
const cardsWon = []

function createBoard () {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}
createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const option1Id = cardsChosenIds[0]
    const option2Id = cardsChosenIds[1]
    
    if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!')
        cards[option1Id].setAttribute('src', 'images/white.png')
        cards[option2Id].setAttribute('src', 'images/white.png')
        cards[option1Id].removeEventListener('click', flipCard)
        cards[option2Id].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    }

    else {
        cards[option1Id].setAttribute('src', 'images/blank.png')
        cards[option2Id].setAttribute('src', 'images/blank.png')
        cards[option1Id].addEventListener('click', flipCard)
        alert('Sorry, try again!')

    }
    resultDisplay.textContent = cardsWon.length
    cardsChosen.pop()
    cardsChosen.pop()
    cardsChosenIds.pop()
    cardsChosenIds.pop()

    if (cardsWon.length == (cardArray.length/2)) {
        resultDisplay.textContent = 'Congratulations you found them all!'
    }

}

function flipCard() {
   const cardId = this.getAttribute('data-id')
   cardsChosen.push(cardArray[cardId].name)
   cardsChosenIds.push(cardId)
   this.setAttribute('src', cardArray[cardId].img)
   if (cardsChosen.length === 2) {
       setTimeout(checkMatch, 500)
   }
   else {
       this.removeEventListener('click', flipCard);
   }
}