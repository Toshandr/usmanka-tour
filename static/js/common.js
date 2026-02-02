// Общий скрипт для всех страниц туров
// Интеграция ЮKassa (YooMoney)
// ВАЖНО: Замените следующие значения на ваши данные из личного кабинета ЮKassa:
// 1. YOOKASSA_SHOP_ID - ID магазина из личного кабинета
// 2. Для продакшена используйте ваш секретный ключ через backend API

const YOOKASSA_CONFIG = {
  shopId: 'ВАШ_SHOP_ID', // Замените на ваш Shop ID из личного кабинета ЮKassa
  secretKey: 'ВАШ_SECRET_KEY', // НИКОГДА не храните на фронтенде! Используйте backend API
  // Для работы с ЮKassa необходимо:
  // 1. Зарегистрироваться на https://yookassa.ru/
  // 2. Создать магазин и получить Shop ID
  // 3. Получить секретный ключ (только для backend)
  // 4. Настроить backend API для создания платежей (см. https://yookassa.ru/developers/api)
  // 5. Заменить значения выше на реальные из вашего кабинета
};

function openPayment(tourType, tariff, amount) {
  document.getElementById('paymentTariff').value = tariff;
  document.getElementById('paymentAmount').value = amount + ' ₽';
  document.getElementById('paymentModal').classList.remove('hidden');
  document.getElementById('paymentModal').classList.add('flex');
}

function closePayment() {
  document.getElementById('paymentModal').classList.add('hidden');
  document.getElementById('paymentModal').classList.remove('flex');
  document.getElementById('paymentForm').reset();
}

// Инициализация формы оплаты
document.addEventListener('DOMContentLoaded', function() {
  const paymentForm = document.getElementById('paymentForm');
  if (paymentForm) {
    paymentForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const name = document.getElementById('paymentName').value;
      const phone = document.getElementById('paymentPhone').value;
      const email = document.getElementById('paymentEmail').value;
      const tariff = document.getElementById('paymentTariff').value;
      const amount = document.getElementById('paymentAmount').value.match(/\d+/)[0];
      const tour = document.body.dataset.tourType || 'general';

      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('tour', tour);
        formData.append('tariff', tariff);
        formData.append('amount', amount);

        const response = await fetch('/api/booking', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('Ошибка отправки заявки');
        }
        
        const result = await response.json();
        
        if (result.status === 'success') {
          alert('Заявка успешно отправлена!\n\n' + result.message);
          closePayment();
        } else {
          throw new Error(result.message || 'Неизвестная ошибка');
        }
      } catch (error) {
        alert('Ошибка при отправке заявки: ' + error.message + '\nПопробуйте позже или свяжитесь с нами.');
        console.error('Booking error:', error);
      }
    });

    // Закрытие модального окна по клику вне его
    const paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
      paymentModal.addEventListener('click', function(e) {
        if (e.target === this) {
          closePayment();
        }
      });
    }
  }
});

