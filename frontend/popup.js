//popup
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup__close');
const popupSuccess = document.getElementById('popupSuccess');
const popupSuccessBtn = document.getElementById('popupSuccessBtn');
const signUpsBtns = Array.from(document.getElementsByClassName('sign_up'));

// показ формы по нажатию на "записаться"
signUpsBtns.forEach((item) =>{
    item.onclick = () => {
        popup.classList.add('active');
    }
});
// закрытие на крестик
popupClose.onclick = () => {
    popup.classList.remove('active');
    removeRedBorder()
}
//закртие на фон
popup.onclick = (event) => {
    if (event.target === popup) {
        popup.classList.remove('active');
        removeRedBorder()
    }
}

// отправка формы
const formInputs = document.querySelectorAll('#contactForm input');
function removeRedBorder() {
    formInputs.forEach(input => {
        input.classList.remove('touched');
    })
}
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        input.classList.add('touched');
    });
});
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/send-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            popup.classList.remove('active');
            popupSuccess.classList.add('active');
        } else {
            alert(result.error);
        }
    } catch (error) {
        alert('Ошибка при отправке формы');
    }
});

popupSuccessBtn.onclick = () => {
    popupSuccess.classList.remove('active');
}