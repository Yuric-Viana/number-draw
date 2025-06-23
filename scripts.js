const form = document.querySelector('form')

// Pegando os elementos do sorteador
const insertNumbers = document.querySelector('.insert-numbers')
const quantity = document.getElementById('numbers')
const of = document.getElementById('of')
const until = document.getElementById('until')
const check = document.getElementById('check')

// Pegando os elementos do resultado
const result = document.querySelector('.result')
const resultList = document.querySelector('.result ul')
const rotateBox = document.querySelector('.rotate-box')
const resultDraw = document.querySelector('.result .draw-button')

// Sorteia números podendo repeti-los
function numbersRepeat(amount, min, max) {
    const result = []

    while (result.length < amount) {
        const drawNumbers = Math.floor(Math.random() * (max - min + 1)) + min

        result.push(drawNumbers)
    }

    return result
}

// Sorteia números não repetidos
function numbersNoRepeat(amount, min, max) {
    const numbersDraw = new Set()
    const result = []

    while (result.length < amount) {
        const drawNumbers = Math.floor(Math.random() * (max - min + 1)) + min

        if (!numbersDraw.has(drawNumbers)) {
            numbersDraw.add(drawNumbers)
            result.push(drawNumbers)
        }
    }

    return result
}

// Animação do botão de sortear somente após a outra animação terminar
rotateBox.addEventListener('animationend', () => {
    resultDraw.style.visibility = 'visible'
    resultDraw.style.animation = 'buttonUp 4s both'
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const button = event.submitter
    const actionButton = button.value

    if (actionButton === 'draw') {
        insertNumbers.style.display = 'none'
        result.style.display = 'block'
        drawNumbersNoRepeat()
    }
})

// Retorna os números sorteados não repetidos
function drawNumbersNoRepeat() {
    let draw = []

    if (check.checked) {
        const valueQuantity = parseInt(quantity.value, 10)
        const valueOf = parseInt(of.value, 10)
        const valueUntil = parseInt(until.value, 10)

        draw = numbersNoRepeat(valueQuantity, valueOf, valueUntil)        
    }
    
    return createList(draw)
}

// Retorna os números sorteados podendo haver repetidos
function drawNumbersRepeat() {
    let draw = []

    if(!check.checked) {
        const valueQuantity = parseInt(quantity.value, 10)
        const valueOf = parseInt(of.value, 10)
        const valueUntil = parseInt(until.value, 10)

        draw = numbersRepeat(valueQuantity, valueOf, valueUntil)
    }

    return draw
}

// Função para criar os números sorteados visualmente
function createList(value) {
    const li = document.createElement('li')

    const boxRotate = document.createElement('div')
    boxRotate.classList.add('rotate-box')

    const itemDraw = document.createElement('span')
    itemDraw.textContent = value

    boxRotate.append(itemDraw)
    li.append(boxRotate)

    return li
} 