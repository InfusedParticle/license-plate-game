let words = []
let currentProcessId = 0
document.addEventListener('DOMContentLoaded', ()=>{
    fetch('words.txt')
    .then((res) => res.text())
    .then((text) => {
        words = text.split(/\r?\n/)
        let input = document.getElementById('input')
        input.disabled = false
        document.getElementById('placeholder').innerHTML = 'Enter Letters Above'

        input.addEventListener('input', ()=>{
            if(input.value.length === 3) {
                clearList()
                document.getElementById('placeholder').style.display = 'none'
                currentProcessId++
                populateList(input.value, currentProcessId)
                document.getElementById('output-container').scrollTop = 0
            }
        })
    })
})

function populateList(licensePlateLetters, processId) {
    let matches = 0
    for(let i = 0; i < words.length; i++) {
        if(currentProcessId != processId)
            return
        let word = words[i]
        if(word.length < 3)
            continue

        if(checkWord(word.toLowerCase(), licensePlateLetters.toLowerCase())) {
            matches++
            addListElement(word)
        }
    }

    if(matches === 0) {
        let placeholder = document.getElementById('placeholder')
        placeholder.style.display = ''
        placeholder.innerHTML = 'No matches found'
    }
}

function clearList() {
    let list = document.getElementById('output-list')
    let numberOfNodes = list.childNodes.length
    for(let i = 0; i < numberOfNodes - 3; i++) {
        list.lastChild.remove()
    }
}

function checkWord(word, licensePlateLetters) {
    if(licensePlateLetters.length !== 3)
        return false

    let licensePlateIndex = 0
    for(let wordIndex = 0; wordIndex < word.length; wordIndex++) {
        let currentLetter = word.charAt(wordIndex)
        if(currentLetter === licensePlateLetters.charAt(licensePlateIndex)) {
            licensePlateIndex++
            if(licensePlateIndex === 3)
                return true
        }
    }
    return false
}

function addListElement(word) {
    let list = document.getElementById('output-list')
    let listItem = document.createElement('li')
    listItem.innerHTML = word
    list.appendChild(listItem)
}