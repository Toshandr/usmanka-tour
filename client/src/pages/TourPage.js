import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { toursData } from '../data/toursData';
import './TourPage.css';

const TourPage = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState(null);

  const handleBooking = (tariff) => {
    setSelectedTariff(tariff);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTariff(null);
  };

  useEffect(() => {
    // Use local data instead of API
    const tour = toursData[tourId];
    setTour(tour || null);
    setLoading(false);
  }, [tourId]);

  // Функция для получения иконок и особенностей каждого тура
  const getTourHeroData = (tourId) => {
    const heroData = {
      dance: {
        icon: 'fas fa-music',
        badge: '💃 Танцы • Видео • Йога',
        features: [
          { icon: 'fas fa-video', text: 'Профессиональная видеосъёмка' },
          { icon: 'fas fa-wine-glass', text: 'Винная дегустация' },
          { icon: 'fas fa-heart', text: 'Йога и релакс' }
        ],
        gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15), rgba(139, 195, 74, 0.1))',
        accentColor: '#4CAF50'
      },
      english: {
        icon: 'fas fa-globe',
        badge: '🇬🇧 English • Игры • Квесты',
        features: [
          { icon: 'fas fa-comments', text: 'Полное погружение в язык' },
          { icon: 'fas fa-gamepad', text: 'Интерактивные игры' },
          { icon: 'fas fa-map-marked-alt', text: 'Квесты на английском' }
        ],
        gradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15), rgba(255, 193, 7, 0.1))',
        accentColor: '#FF9800'
      },
      culinary: {
        icon: 'fas fa-utensils',
        badge: '👨‍🍳 Кулинария • Шеф-повар • Дегустация',
        features: [
          { icon: 'fas fa-fire', text: 'Готовка на костре' },
          { icon: 'fas fa-award', text: 'Мастер-классы шеф-повара' },
          { icon: 'fas fa-wine-bottle', text: 'Сочетание вин с блюдами' }
        ],
        gradient: 'linear-gradient(135deg, rgba(156, 39, 176, 0.15), rgba(233, 30, 99, 0.1))',
        accentColor: '#9C27B0'
      },
      fitness: {
        icon: 'fas fa-dumbbell',
        badge: '💪 Фитнес • Йога • Активность',
        features: [
          { icon: 'fas fa-running', text: 'Групповые тренировки' },
          { icon: 'fas fa-leaf', text: 'Йога на природе' },
          { icon: 'fas fa-ship', text: 'Сплавы на байдарках' }
        ],
        gradient: 'linear-gradient(135deg, rgba(33, 150, 243, 0.15), rgba(3, 169, 244, 0.1))',
        accentColor: '#2196F3'
      },
      'fitness-dating': {
        icon: 'fas fa-heart',
        badge: '💕 Знакомства • Фитнес • Пары',
        features: [
          { icon: 'fas fa-users', text: 'Парные тренировки' },
          { icon: 'fas fa-puzzle-piece', text: 'Совместные квесты' },
          { icon: 'fas fa-glass-cheers', text: 'Романтичная атмосфера' }
        ],
        gradient: 'linear-gradient(135deg, rgba(233, 30, 99, 0.15), rgba(255, 64, 129, 0.1))',
        accentColor: '#E91E63'
      },
      guitar: {
        icon: 'fas fa-guitar',
        badge: '🎸 Гитара • Музыка • Костёр',
        features: [
          { icon: 'fas fa-music', text: 'Обучение с нуля' },
          { icon: 'fas fa-fire', text: 'Песни у костра' },
          { icon: 'fas fa-star', text: 'Первая песня за выходные' }
        ],
        gradient: 'linear-gradient(135deg, rgba(255, 87, 34, 0.15), rgba(255, 152, 0, 0.1))',
        accentColor: '#FF5722'
      }
    };
    return heroData[tourId] || heroData.dance;
  };

  if (loading) {
    return (
      <div className="preloader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Тур не найден</h2>
        <a href="/" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
          Вернуться на главную
        </a>
      </div>
    );
  }

  const heroData = getTourHeroData(tourId);

  // Normalize conditions & faq so we support multiple data shapes
  const included = tour.conditions?.included || tour.included || [];

  const toBring = (() => {
    if (tour.conditions?.toBring) return tour.conditions.toBring;
    if (!tour.what_to_bring) return [];
    // if what_to_bring is an array of groups with items, flatten
    if (Array.isArray(tour.what_to_bring) && tour.what_to_bring.length && typeof tour.what_to_bring[0] === 'object') {
      return tour.what_to_bring.flatMap((g) => g.items || []);
    }
    return tour.what_to_bring;
  })();

  const faqList = (() => {
    if (Array.isArray(tour.faq) && tour.faq.length) {
      // if items already have question/answer
      if (tour.faq[0] && tour.faq[0].question) return tour.faq;
      // otherwise assume array of strings
      return tour.faq.map((q) => ({ question: q, answer: '' }));
    }
    if (Array.isArray(tour.faq_extra) && tour.faq_extra.length) {
      return tour.faq_extra.map((q) => ({ question: q, answer: '' }));
    }
    return [];
  })();

  return (
    <div className="tour-page">
      {/* Улучшенная Hero секция */}
      <section className="tour-hero" style={{ background: heroData.gradient }}>
        <div className="container">
          <div className="tour-hero-content">
            <div className="tour-hero-icon" style={{ color: heroData.accentColor }}>
              <i className={heroData.icon}></i>
            </div>
            
            <span className="tour-hero-badge" style={{ background: `${heroData.accentColor}20`, color: heroData.accentColor }}>
              {heroData.badge}
            </span>
            
            <h1 className="tour-hero-title">
              {tour.title}
            </h1>
            
            <p className="tour-hero-description">
              {tour.description}
            </p>
            
            <div className="tour-hero-features">
              {heroData.features.map((feature, index) => (
                <div key={index} className="tour-hero-feature">
                  <i className={feature.icon} style={{ color: heroData.accentColor }}></i>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
            
            <div className="tour-hero-stats">
              <div className="tour-stat">
                <div className="tour-stat-value">{tour.duration}</div>
                <div className="tour-stat-label">Длительность</div>
              </div>
              <div className="tour-stat">
                <div className="tour-stat-value">от {tour.price.toLocaleString('ru-RU')} ₽</div>
                <div className="tour-stat-label">Стоимость</div>
              </div>
              <div className="tour-stat">
                <div className="tour-stat-value">20-21 июня</div>
                <div className="tour-stat-label">Даты</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Архитектура тура */}
        <section className="tour-section glass">
          <h2 className="section-title">1. Архитектура тура</h2>
          <ul className="feature-list">
            {tour.architecture.map((item, index) => (
              <li key={index}>
                <i className="fas fa-check"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Это для вас если */}
        <section className="tour-section glass">
          <h2 className="section-title">2. ЭТО ДЛЯ ВАС если</h2>
          <ul className="feature-list">
            {tour.forYou.map((item, index) => (
              <li key={index}>
                <i className="fas fa-star"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Расписание */}
        <section className="tour-section glass">
          <h2 className="section-title">3. Расписание</h2>
          <div className="schedule-grid">
            <div className="schedule-day">
              <h3>День 1</h3>
              {tour.schedule.day1.map((item, index) => (
                <div key={index} className="schedule-item">
                  <div className="schedule-time">{item.time}</div>
                  <div className="schedule-content">
                    <div className="schedule-title">{item.title}</div>
                    {item.location && <div className="schedule-location">{item.location}</div>}
                  </div>
                </div>
              ))}
            </div>

            <div className="schedule-day">
              <h3>День 2</h3>
              {tour.schedule.day2.map((item, index) => (
                <div key={index} className="schedule-item">
                  <div className="schedule-time">{item.time}</div>
                  <div className="schedule-content">
                    <div className="schedule-title">{item.title}</div>
                    {item.location && <div className="schedule-location">{item.location}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Что получите */}
        <section className="tour-section glass">
          <h2 className="section-title">4. Что получите</h2>
          <ul className="feature-list">
            {tour.benefits.map((item, index) => (
              <li key={index}>
                <i className="fas fa-gift"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Тарифы */}
        <section className="tour-section glass">
          <h2 className="section-title">5. Тарифы</h2>
          <div className="tariffs-grid">
            {tour.tariffs.map((tariff, index) => (
              <div key={index} className="tariff-card">
                <h3>{tariff.name}</h3>
                <div className="tariff-price">{tariff.price.toLocaleString('ru-RU')} ₽</div>
                {tariff.wine > 0 && (
                  <div className="tariff-wine">+ {tariff.wine} ₽ винная дегустация</div>
                )}
                <div className="tariff-details">
                  {tariff.room !== 'Нет' && <div><i className="fas fa-bed"></i> {tariff.room}</div>}
                  {tariff.accommodation !== 'Нет' && <div><i className="fas fa-users"></i> {tariff.accommodation}</div>}
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleBooking(tariff)}
                >
                  Забронировать
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Ведущие */}
        <section className="tour-section glass">
          <h2 className="section-title">6. Ведущие</h2>
          <div className="leaders-grid">
            {tour.leaders.map((leader, index) => (
              <div key={index} className="leader-card">
                <div className="leader-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h4>{leader.name}</h4>
                  <p>{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Условия */}
        {(included.length > 0 || toBring.length > 0) && (
          <section className="tour-section glass">
            <h2 className="section-title">7. Условия</h2>
            <div className="conditions-grid">
              <div className="conditions-block">
                <h3><i className="fas fa-check-circle"></i> Включено в тур:</h3>
                <ul className="feature-list">
                  {included.map((item, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="conditions-block">
                <h3><i className="fas fa-suitcase"></i> Необходимо взять с собой:</h3>
                <ul className="feature-list">
                  {toBring.map((item, index) => (
                    <li key={index}>
                      <i className="fas fa-arrow-right"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqList.length > 0 && (
          <section className="tour-section glass">
            <h2 className="section-title">8. FAQ</h2>
            <div className="faq-list">
              {faqList.map((item, index) => (
                <div key={index} className="faq-item">
                  <h4 className="faq-question">
                    <i className="fas fa-question-circle"></i>
                    {item.question}
                  </h4>
                  {item.answer && <p className="faq-answer">{item.answer}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Модальное окно бронирования */}
      {isModalOpen && selectedTariff && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          tour={tour}
          tariff={selectedTariff}
        />
      )}
    </div>
  );
};

export default TourPage;
