document.querySelectorAll('.accordion__header').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
        button.classList.toggle('active');
    });
});