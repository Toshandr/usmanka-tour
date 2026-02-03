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
      <div className="container">
        <div className="tour-hero">
          <h1 className="tour-page-title">{tour.title}</h1>
          <p className="tour-page-description">{tour.description}</p>
        </div>

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
