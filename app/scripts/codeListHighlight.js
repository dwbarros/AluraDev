document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.editor__code').forEach((el) => {
        hljs.highlightElement(el);
    });
});