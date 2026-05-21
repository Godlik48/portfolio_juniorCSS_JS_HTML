const burger = document.getElementById('burger');
const nav = document.getElementById('nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Перевіряємо, чи обидва елементи існують на сторінці
if (burger && nav) {
    const toggleMenu = () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    };

    burger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                toggleMenu();
            }
        });
    });
}   