// Общий скрипт для страниц туров (бронирование)
// ЮKassa: настройка только через backend API

function openPayment(tourType, tariff, amount) {
  var tariffEl = document.getElementById('paymentTariff');
  var amountEl = document.getElementById('paymentAmount');
  var modal = document.getElementById('paymentModal');
  if (tariffEl) tariffEl.value = tariff;
  if (amountEl) amountEl.value = amount + ' \u20BD';
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closePayment() {
  var modal = document.getElementById('paymentModal');
  var form = document.getElementById('paymentForm');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  if (form) form.reset();
}

document.addEventListener('DOMContentLoaded', function() {
  var paymentForm = document.getElementById('paymentForm');
  if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var name = document.getElementById('paymentName').value;
      var phone = document.getElementById('paymentPhone').value;
      var email = document.getElementById('paymentEmail').value;
      var tariff = document.getElementById('paymentTariff').value;
      var amountEl = document.getElementById('paymentAmount');
      var amountMatch = amountEl && amountEl.value.match(/\d+/);
      var amount = amountMatch ? amountMatch[0] : '0';
      var tour = document.body.dataset && document.body.dataset.tourType ? document.body.dataset.tourType : 'general';

      var formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('tour', tour);
      formData.append('tariff', tariff);
      formData.append('amount', amount);

      fetch('/api/booking', {
        method: 'POST',
        body: formData
      })
        .then(function(response) {
          if (!response.ok) throw new Error('Ошибка отправки заявки');
          return response.json();
        })
        .then(function(result) {
          if (result.status === 'success') {
            alert('Заявка успешно отправлена!\n\n' + result.message);
            closePayment();
          } else {
            throw new Error(result.message || 'Неизвестная ошибка');
          }
        })
        .catch(function(error) {
          alert('Ошибка при отправке заявки: ' + error.message + '\nПопробуйте позже или свяжитесь с нами.');
          console.error('Booking error:', error);
        });
    });

    var paymentModal = document.getElementById('paymentModal');
    if (paymentModal) {
      paymentModal.addEventListener('click', function(e) {
        if (e.target === this) closePayment();
      });
    }
  }
});
