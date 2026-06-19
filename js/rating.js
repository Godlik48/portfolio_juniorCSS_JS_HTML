// rating.js
// Інтерактивна оцінка порфоліо зірками (1-5).
// Особиста для кожного відвідувача: зберігається в localStorage браузера.
// Якщо людина вже оцінювала раніше — при наступному візиті бачить свою оцінку.

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('rating-stars');
    if (!wrapper) return;

    const stars = Array.from(wrapper.querySelectorAll('.star'));
    const feedback = document.getElementById('rating-feedback');
    const STORAGE_KEY = 'gl-portfolio-rating';

    const messages = {
        1: 'Дякую за відгук, буду старатися краще',
        2: 'Дякую за відгук, є над чим попрацювати',
        3: 'Дякую за оцінку!',
        4: 'Дуже приємно, дякую!',
        5: 'Вау, дякую за найвищу оцінку! 🎉'
    };

    function paintStars(value) {
        stars.forEach((star) => {
            const starValue = Number(star.dataset.value);
            star.classList.toggle('is-filled', starValue <= value);
        });
    }

    function setRating(value, { persist = true } = {}) {
        wrapper.dataset.rating = String(value);
        paintStars(value);
        feedback.textContent = messages[value] || 'Натисніть на зірку, щоб оцінити';
        feedback.classList.toggle('is-set', value > 0);

        if (persist) {
            try {
                localStorage.setItem(STORAGE_KEY, String(value));
            } catch (e) {
                // localStorage недоступний (приватний режим тощо) — просто ігноруємо
            }
        }
    }

    // Відновлюємо попередню оцінку цього відвідувача, якщо вона є
    let savedRating = 0;
    try {
        savedRating = Number(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch (e) {
        savedRating = 0;
    }
    if (savedRating > 0) {
        setRating(savedRating, { persist: false });
    }

    stars.forEach((star) => {
        star.addEventListener('click', () => {
            const value = Number(star.dataset.value);
            setRating(value);
        });

        star.addEventListener('mouseenter', () => {
            paintStars(Number(star.dataset.value));
        });
    });

    wrapper.addEventListener('mouseleave', () => {
        paintStars(Number(wrapper.dataset.rating) || 0);
    });
});