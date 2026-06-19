// accordion.js
// Блоки "Хто я?", "Hard Skills", "Soft Skills", "Potential" на мобілці (≤600px)
// розкриваються/згортаються по кліку на стрілочку ^
// На десктопі — завжди розгорнуто, скрипт нічого не робить.

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.accordion-card');
    const MOBILE_QUERY = '(max-width: 600px)';

    function isMobile() {
        return window.matchMedia(MOBILE_QUERY).matches;
    }

    cards.forEach((card) => {
        const toggle = card.querySelector('.accordion-toggle');
        if (!toggle) return;

        // На мобілці перша картка ("Хто я?") стартує відкритою, решта — закриті.
        // Десктоп: клас is-open ні на що не впливає (CSS ігнорує його поза медіа-запитом).
        if (!card.classList.contains('accordion-card--first')) {
            card.classList.remove('is-open');
        }

        toggle.addEventListener('click', () => {
            if (!isMobile()) return; // на десктопі клік нічого не змінює
            const isOpen = card.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    });

    // При ресайзі з мобільного на десктоп прибираємо aria-стан, що згортав вміст
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            cards.forEach((card) => {
                const toggle = card.querySelector('.accordion-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'true');
            });
        }
    });
});