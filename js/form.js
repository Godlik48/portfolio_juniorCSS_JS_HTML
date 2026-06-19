const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    
    const formData = new FormData(this);
    
    // Блокуємо кнопку, застосовується CSS клас :disabled
    submitBtn.textContent = 'Надсилаю...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('https://formspree.io/f/xkoyezzd', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            submitBtn.textContent = 'Успішно відправлено! ✓';
            submitBtn.style.background = 'var(--accent-purple)';
            contactForm.reset();
            
            // Повертаємо кнопку в норму через 3 секунди
            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        } else {
            throw new Error('Помилка сервера');
        }
    } catch (error) {
        alert('Ой! Сталася помилка. Перевірте інтернет або спробуйте пізніше.');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});
