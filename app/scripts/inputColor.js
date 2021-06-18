inputColor = document.querySelector('.custom__config__color')

inputColor.addEventListener('input', (event) => {
    document.querySelector('.editor__container').style.backgroundColor = event.target.value;
})