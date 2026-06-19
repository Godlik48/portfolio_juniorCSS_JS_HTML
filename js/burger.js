const burger = document.getElementById('burger');
const nav = document.getElementById('nav-links');
const navLinks = document.querySelectorAll('.nav-links li, .nav-links .nav-buy-mobile');

// Перевіряємо, чи обидва елементи існують на сторінці
if (burger && nav) {
    burger.setAttribute('role', 'button');
    burger.setAttribute('tabindex', '0');
    burger.setAttribute('aria-label', 'Відкрити меню');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'nav-links');

    const isOpen = () => nav.classList.contains('nav-active');

    const openMenu = () => {
        nav.classList.add('nav-active');
        burger.classList.add('toggle');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Закрити меню');
        document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Відкрити меню');
        document.body.classList.remove('menu-open');
    };

    const toggleMenu = () => {
        isOpen() ? closeMenu() : openMenu();
    };

    burger.addEventListener('click', toggleMenu);

    // Доступність з клавіатури: Enter / Space
    burger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isOpen()) {
                closeMenu();
            }
        });
    });

    // Закриття по кліку поза меню
    document.addEventListener('click', (e) => {
        if (!isOpen()) return;
        const clickedInsideNav = nav.contains(e.target);
        const clickedBurger = burger.contains(e.target);
        if (!clickedInsideNav && !clickedBurger) {
            closeMenu();
        }
    });

    // Закриття по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) {
            closeMenu();
            burger.focus();
        }
    });

    // Якщо вікно розширили назад до десктопу — гарантовано прибираємо клас
    window.addEventListener('resize', () => {
        if (window.innerWidth > 600 && isOpen()) {
            closeMenu();
        }
    });
}
