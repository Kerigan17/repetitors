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

