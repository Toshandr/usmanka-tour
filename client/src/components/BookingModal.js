import React, { useState } from 'react';
import axios from 'axios';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, tour, tariff }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Блокировка скролла при открытом модальном окне
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('/api/booking', {
        ...formData,
        tour: tour.id,
        tariff: tariff.name,
        amount: tariff.price
      });

      setMessage({
        type: 'success',
        text: response.data.message || 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
      });

      // Очистка формы
      setFormData({ name: '', phone: '', email: '' });

      // Закрытие модального окна через 3 секунды
      setTimeout(() => {
        onClose();
        setMessage({ type: '', text: '' });
      }, 3000);

    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Ошибка при отправке заявки. Попробуйте позже.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          <i className="fas fa-times"></i>
        </button>

        <h2 className="modal-title">Бронирование тура</h2>

        <div className="booking-info">
          <div className="info-item">
            <span className="info-label">Тур:</span>
            <span className="info-value">{tour.shortTitle}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Тариф:</span>
            <span className="info-value">{tariff.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Стоимость:</span>
            <span className="info-value price">{tariff.price.toLocaleString('ru-RU')} ₽</span>
          </div>
          {tariff.wine > 0 && (
            <div className="info-item">
              <span className="info-label">Винная дегустация:</span>
              <span className="info-value">+{tariff.wine.toLocaleString('ru-RU')} ₽</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="name">Имя *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Введите ваше имя"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Телефон *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+7 (900) 123-45-67"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
              {message.text}
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Отправка...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Отправить заявку
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Отмена
            </button>
          </div>
        </form>

        <p className="modal-note">
          * После отправки заявки мы свяжемся с вами для подтверждения бронирования
        </p>
      </div>
    </div>
  );
};

export default BookingModal;
