//popup
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup__close');
const popupSuccess = document.getElementById('popupSuccess');
const popupSuccessBtn = document.getElementById('popupSuccessBtn');
const signUpsBtns = Array.from(document.getElementsByClassName('sign_up'));
const body = document.body;

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

// скролл странциы
const menuLinks = document.querySelectorAll('nav ul li a');
function isSectionInViewport(section) {
  const rect = section.getBoundingClientRect();
  return (
    rect.top <= 250 && rect.bottom >= 250 // 250 — отступ для учета высоты меню
  );
}
function updateActiveMenu() {
  menuLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (isSectionInViewport(section)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', updateActiveMenu);
updateActiveMenu();

// нажатие на пункты меню
function scrollToSectionWithOffset(event) {
  event.preventDefault();

  const targetId = event.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(targetId);

  if (targetSection) {
    const offset = 100; // Отступ сверху в пикселях
    const targetPosition = targetSection.offsetTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}
menuLinks.forEach(link => {
  link.addEventListener('click', scrollToSectionWithOffset);
});

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

//swipper js
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  autoplay: {
      delay: 4000,
      disableOnInteraction: true,
  },
  loop: true,
  pagination: {
      el: ".swiper-pagination",
      clickable: true,
  },
});