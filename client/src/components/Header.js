import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (isInfoDropdownOpen && !event.target.closest('.dropdown')) {
        setIsInfoDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isInfoDropdownOpen]);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    setIsInfoDropdownOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCalendarClick = () => {
    setIsMobileMenuOpen(false);
    setIsInfoDropdownOpen(false);
    navigate('/calendar');
  };

  const handleInProgressClick = () => {
    setIsMobileMenuOpen(false);
    setIsInfoDropdownOpen(false);
    navigate('/in-progress');
  };

  const toggleInfoDropdown = () => {
    setIsInfoDropdownOpen(!isInfoDropdownOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <i className="fas fa-leaf"></i>
            </div>
          </Link>

          <div className="brand-title">
            <span>Усманка Тур</span>
          </div>

          <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <button 
              type="button" 
              className="nav-link"
              onClick={handleInProgressClick}
            >
              О нас
            </button>
            <button 
              type="button" 
              className="nav-link"
              onClick={() => handleNavClick('tours')}
            >
              Готовые Туры
            </button>
            <button 
              type="button" 
              className="nav-link"
              onClick={handleInProgressClick}
            >
              Индивидуальные туры
            </button>
            
            <div className="dropdown">
              <button 
                type="button" 
                className={`nav-link dropdown-toggle ${isInfoDropdownOpen ? 'active' : ''}`}
                onClick={toggleInfoDropdown}
              >
                Информация
                <i className={`fas fa-chevron-down ${isInfoDropdownOpen ? 'rotate' : ''}`}></i>
              </button>
              {isInfoDropdownOpen && (
                <div className="dropdown-menu">
                  <button 
                    type="button" 
                    className="dropdown-item"
                    onClick={handleCalendarClick}
                  >
                    <i className="fas fa-calendar-alt"></i>
                    Календарь
                  </button>
                  <button 
                    type="button" 
                    className="dropdown-item"
                    onClick={handleInProgressClick}
                  >
                    <i className="fas fa-blog"></i>
                    Блог
                  </button>
                  <button 
                    type="button" 
                    className="dropdown-item"
                    onClick={handleInProgressClick}
                  >
                    <i className="fas fa-images"></i>
                    Галерея
                  </button>
                </div>
              )}
            </div>

            <button 
              type="button" 
              className="nav-link"
              onClick={() => handleNavClick('contact')}
            >
              Контакты
            </button>
          </nav>

          <div className="header-contacts">
            <div className="contact-text">
              <i className="fas fa-phone"></i>
              <span>+7 (900) 123-45-67</span>
            </div>
            <div className="contact-text">
              <i className="fas fa-envelope"></i>
              <span>info@usmanka-weekend.ru</span>
            </div>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Меню"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
