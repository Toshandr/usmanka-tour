import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    
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
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <div className="logo-text">
              <h1>Усманка-уикенд</h1>
              <p>20–21 июня 2026</p>
            </div>
          </Link>

          <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <button 
              type="button" 
              className="nav-link"
              onClick={() => handleNavClick('tours')}
            >
              Туры
            </button>
            <button 
              type="button" 
              className="nav-link"
              onClick={() => handleNavClick('about')}
            >
              О нас
            </button>
            <button 
              type="button" 
              className="nav-link btn btn-primary"
              onClick={() => handleNavClick('contact')}
            >
              Связаться
            </button>
          </nav>

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
