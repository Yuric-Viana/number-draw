const form = document.querySelector('form')
let cont = 1

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

// Captura o submit do usuário
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const button = event.submitter
    const actionButton = button.value

    if (actionButton === 'draw') {
        drawNumbers()

    } else if (actionButton === 'draw-again') {
        drawAgain()
    }
})

// Retorna os números sorteados não repetidos
function drawNumbersNoRepeat() {
    let draw = []

    if (check.checked) {
        const valueQuantity = parseInt(quantity.value.match(/^(?!-)\d+(\.\d+)?$/))
        const valueOf = parseInt(of.value.match(/^(?!-)\d+(\.\d+)?$/))
        const valueUntil = parseInt(until.value.match(/^(?!-)\d+(\.\d+)?$/))

        const isValid = valueUntil - valueOf

        if (valueQuantity > isValid || valueOf > valueUntil) {

            alert('Verifique os valores inseridos:\n- A quantidade de números não pode ser maior que o intervalo disponível.\n- O número inicial deve ser menor que o número final.\- O número inicial não pode ser o mesmo que o número final');

            return draw

        } else {
            draw = numbersNoRepeat(valueQuantity, valueOf, valueUntil)
        }
    }

    return draw
}

// Retorna os números sorteados podendo haver repetidos
function drawNumbersRepeat() {
    let draw = []

    if (!check.checked) {
        const valueQuantity = parseInt(quantity.value.match(/^(?!-)\d+(\.\d+)?$/))
        const valueOf = parseInt(of.value.match(/^(?!-)\d+(\.\d+)?$/))
        const valueUntil = parseInt(until.value.match(/^(?!-)\d+(\.\d+)?$/))

        const isValid = valueUntil - valueOf

        if (valueQuantity > isValid || valueOf > valueUntil) {

            alert('Verifique os valores inseridos:\n- A quantidade de números não pode ser maior que o intervalo disponível.\n- O número inicial deve ser menor que o número final.\n- O número inicial não pode ser o mesmo que o número final');

            return draw

        } else {
            draw = numbersRepeat(valueQuantity, valueOf, valueUntil)
        }

    }

    return draw
}

// Função para criar a estrutura dos números sorteados
function createList(value) { 

    return value.map(values => {
        const li = document.createElement('li')

        const boxRotate = document.createElement('div')
        boxRotate.classList.add('rotate-box')

        const itemDraw = document.createElement('span')
        itemDraw.textContent = values

        boxRotate.append(itemDraw)
        li.append(boxRotate)

        return li
    })
}

// Função para que cada os li entrem um por vez
function appendWithDelay(items, container, delay = 5000) {
    items.forEach((item, index) => {
        setTimeout(() => {
            container.appendChild(item)

            if (index === items.length - 1) {
                const boxRotate = item.querySelector('.rotate-box')

                resultDraw.style.visibility = 'hidden'
                resultDraw.style.animation = 'none'

                boxRotate.addEventListener('animationend', () => {
                    resultDraw.style.visibility = 'visible'
                    resultDraw.style.animation = 'buttonUp 4s both'
                })
            }

        }, index * delay)
    })
}

// Função para sortear mais uma vez
function drawAgain() {
    const quantityDraw = document.querySelector('.result strong')

    cont++
    quantityDraw.textContent = `${cont}° Resultado`
    resultDraw.style.visibility = 'hidden'

    if (check.checked) {
        resultList.innerHTML = ''
        drawNumbers()
    } else {
        resultList.innerHTML = ''
        drawNumbers()
    }
}

// Função para criar os elementos visualmente
function drawNumbers() {
    let items = []

    if (check.checked) {
        items = drawNumbersNoRepeat()

        if (items.length === 0) {
            quantity.value = ''
            of.value = ''
            until.value = ''

            return
        } else {
            const itemsNoRepeat = createList(items)

            insertNumbers.style.display = 'none'
            result.style.display = 'block'
            appendWithDelay(itemsNoRepeat, resultList)
        }

    } else {
        items = drawNumbersRepeat()

        if (items.length === 0) {
            quantity.value = ''
            of.value = ''
            until.value = ''

            return
        } else {
            const itemsRepeat = createList(items)

            insertNumbers.style.display = 'none'
            result.style.display = 'block'
            appendWithDelay(itemsRepeat, resultList)
        }

    }
}