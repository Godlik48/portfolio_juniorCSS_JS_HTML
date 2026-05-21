// Функція появи об'єктів при скролі (Intersection Observer)
const observerOptions = {
    threshold: 0.1 // анімація почнеться, коли видно 10% об'єкта
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Налаштування елементів для появи
document.addEventListener('DOMContentLoaded', () => {
    // Додаємо клас reveal всім потрібним секціям
    const sections = document.querySelectorAll('.hero-content, .about-grid > div, .project-card, .contact-wrapper');
    sections.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Плавна поява самої сторінки
    document.body.classList.add('page-loaded');
});