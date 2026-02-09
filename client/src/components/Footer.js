import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    // Если мы не на главной странице, сначала переходим на неё
    if (location.pathname !== '/') {
      navigate('/');
      // Ждём немного, чтобы страница загрузилась, затем скроллим
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Если уже на главной, просто скроллим
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <div className="logo-text">Усманка тур</div>
            </div>
            <p className="footer-description">
              Активные туры выходного дня на природе Воронежской области
            </p>
          </div>

          <div className="footer-section">
            <h4>Быстрые ссылки</h4>
            <ul>
              <li>
                <button 
                  type="button" 
                  className="footer-nav-link"
                  onClick={() => handleNavClick('tours')}
                >
                  Все туры
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="footer-nav-link"
                  onClick={() => handleNavClick('about')}
                >
                  О месте
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="footer-nav-link"
                  onClick={() => handleNavClick('testimonials')}
                >
                  Отзывы
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  className="footer-nav-link"
                  onClick={() => handleNavClick('contact')}
                >
                  Контакты
                </button>
              </li>
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
            © {currentYear} Усманка тур. Все права защищены
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
