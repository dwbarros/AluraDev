const editorCode = document.querySelector('.editor__code')
const lpSelector = document.querySelector('.custom__config__lp')
const bntViewHeighlight = document.querySelector('.editor__button')


lpSelector.addEventListener('change', () => {
    _setLanguage()
    hljs.highlightElement(editorCode)
})


bntViewHeighlight.addEventListener('click', () => {
    _updateHighlight()
})


function _setLanguage() {
    editorCode.className = `editor__code hljs language-${lpSelector.value}`
}


function _updateHighlight() {
    editorCode.className = 'editor__code hljs'
    hljs.highlightElement(editorCode)
    _createOption()
}

/** Função que Percorre as classes o editor de código, se a classe começa com 'language-' 
    elimina essa string e atribui apenas o nome da linguagem. 
    Verifica se a linguagem já exite no select, se não exitir, cria uma novo option.*/
function _createOption () {

    const classList = editorCode.className.split(/\s+/)
    const options = lpSelector.options    
    let language = ''
    let isOnSelect = false

    classList.forEach(element => {
        if(element.startsWith('language-')) {
            language = element.replace('language-', '')
        }
    })

    if (language == 'undefined') {
        return
    } else {
        for (let i = 0; i < options.length; i++) {
            if(options[i].value == language) {
                options[i].selected = true
                return
            } else {
                isOnSelect = false
            }
        }
    }   

    if(!isOnSelect) {
        lpSelector.append(new Option(language, language, true, true))
    }
}



