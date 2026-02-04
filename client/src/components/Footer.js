import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <div className="logo-text">Усманка-уикенд</div>
            </div>
            <p className="footer-description">
              Активные туры выходного дня на природе Воронежской области
            </p>
          </div>

          <div className="footer-section">
            <h4>Быстрые ссылки</h4>
            <ul>
              <li><a href="#tours">Все туры</a></li>
              <li><a href="#about">О месте</a></li>
              <li><a href="#testimonials">Отзывы</a></li>
              <li><a href="#contact">Контакты</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Контакты</h4>
            <ul className="contact-list">
              <li>
                <i className="fas fa-phone"></i>
                <a href="tel:+79001234567">+7 (900) 123-45-67</a>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:info@usmanka-weekend.ru">info@usmanka-weekend.ru</a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>г. Воронеж, пл. Ленина</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            © {currentYear} Усманка-уикенд. Все права защищены
          </div>
          <div className="footer-links">
            <button type="button" className="footer-link-btn">Политика конфиденциальности</button>
            <button type="button" className="footer-link-btn">Договор оферты</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
