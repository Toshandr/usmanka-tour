import React, { useState, useEffect } from 'react';
import TourCard from '../components/TourCard';
import HeroSlider from '../components/HeroSlider';
import Calendar from './Calendar';
import { toursData } from '../data/toursData';
import './Home.css';

const Home = () => {
  const [tours, setTours] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use local data instead of API
    setTours(toursData);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Обработка якорей при переходе с других страниц или клике на якорь
    const handleHashChange = () => {
      const hash = window.location.hash;
      // Проверяем что hash не пустой и не является роутом (не начинается с #/)
      if (hash && hash.length > 1 && !hash.startsWith('#/')) {
        setTimeout(() => {
          try {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          } catch (e) {
            // Игнорируем ошибки невалидных селекторов
            console.warn('Invalid selector:', hash);
          }
        }, 100);
      }
    };

    // Обработка при загрузке
    handleHashChange();

    // Обработка при изменении хеша
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [loading]);

  if (loading) {
    return (
      <div className="preloader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Tours Section */}
      <section id="tours" className="tours-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Выберите тур</span>
            <h2 className="section-title">Все туры</h2>
          </div>

          <div className="tours-grid">
            {Object.values(tours).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section id="calendar" className="calendar-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Расписание</span>
            <h2 className="section-title">Календарь туров</h2>
            <p className="section-description">
              Выберите удобную дату для вашего путешествия
            </p>
          </div>
          <Calendar />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Отзывы</span>
            <h2 className="section-title">Что говорят участники</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card glass">
              <div className="testimonial-header">
                <div className="testimonial-avatar">А</div>
                <div>
                  <h4>Анна</h4>
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                Танцевальный уикенд превзошёл все ожидания! Вика - потрясающий хореограф, 
                а видео получились просто волшебными. Обязательно вернусь!
              </p>
            </div>

            <div className="testimonial-card glass">
              <div className="testimonial-header">
                <div className="testimonial-avatar">М</div>
                <div>
                  <h4>Михаил</h4>
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                Английская Усманка - это нечто! Два дня полного погружения в язык на природе. 
                Выучил больше слов, чем за месяц занятий. Рекомендую!
              </p>
            </div>

            <div className="testimonial-card glass">
              <div className="testimonial-header">
                <div className="testimonial-avatar">Е</div>
                <div>
                  <h4>Елена</h4>
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                Кулинарный тур - это любовь! Научилась готовить блюда высокой кухни, 
                попробовала потрясающие вина. Атмосфера невероятная!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">О месте</span>
            <h2 className="section-title">Усманка — природа Воронежской области</h2>
          </div>

          <div className="about-grid">
            <div className="about-card glass">
              <div className="about-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Удобное расположение</h3>
              <p>
                Отправление от пл. Ленина в Воронеже в 09:00. Дорога занимает около часа. 
                Возвращение в тот же день или на следующий — на ваш выбор
              </p>
            </div>

            <div className="about-card glass">
              <div className="about-icon">
                <i className="fas fa-tree"></i>
              </div>
              <h3>Живописная природа</h3>
              <p>
                Усманский бор, река Усманка, замок принцессы Ольденбургской в Рамони. 
                Идеальное место для активного отдыха и фотосессий
              </p>
            </div>

            <div className="about-card glass">
              <div className="about-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Профессиональные ведущие</h3>
              <p>
                Опытные инструкторы, хореографы, преподаватели английского, шеф-повара и сомелье. 
                Каждый тур — это качественное обучение
              </p>
            </div>

            <div className="about-card glass">
              <div className="about-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Безопасность и комфорт</h3>
              <p>
                Организованный трансфер, проверенное размещение, качественное питание. 
                Возврат 100% при отмене за 95+ дней
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Контакты</span>
            <h2 className="section-title">Остались вопросы?</h2>
            <p className="section-description">
              Свяжитесь с нами для получения дополнительной информации
            </p>
          </div>

          <div className="contact-card glass">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-info">
                <div className="contact-label">Телефон для связи</div>
                <a href="tel:+79001234567" className="contact-value">+7 (900) 123-45-67</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-info">
                <div className="contact-label">Email</div>
                <a href="mailto:info@usmanka-weekend.ru" className="contact-value">
                  info@usmanka-weekend.ru
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-info">
                <div className="contact-label">Место отправления</div>
                <div className="contact-value">пл. Ленина, Воронеж</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
