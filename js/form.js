const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    
    // Створюємо об'єкт з даними форми
    const formData = new FormData(this);
    
    // Блокуємо кнопку на час відправки
    submitBtn.textContent = 'Надсилаю...';
    submitBtn.disabled = true;

    try {
        // Заміни 'YOUR_FORM_ID' на ID, який отримаєш від Formspree
        const response = await fetch('https://formspree.io/f/xkoyezzd', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('Дякую! Повідомлення успішно надіслано.');
            contactForm.reset(); // Очищуємо форму
        } else {
            alert('Ой! Сталася помилка. Спробуйте пізніше.');
        }
    } catch (error) {
        alert('Помилка з’єднання. Перевірте інтернет.');
    } finally {
        // Повертаємо кнопку в початковий стан
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});