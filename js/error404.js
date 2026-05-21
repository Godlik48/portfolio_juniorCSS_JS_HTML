document.addEventListener('DOMContentLoaded', () => {
    // Список файлів, які точно існують
    const validPages = [
        'index.html',
        'project-1.html',
        'project-2.html',
        'project-3.html',
        'project-4.html',
        '404.html'
    ];

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Перевіряємо тільки внутрішні посилання на .html
            if (href && href.endsWith('.html') && !href.startsWith('http')) {
                // Якщо це посилання на неіснуючу сторінку
                if (!validPages.includes(href)) {
                    e.preventDefault();
                    window.location.href = '404.html';
                }
                // Якщо це посилання на існуючу сторінку — дозволяємо переход
            }
        });
    });
});