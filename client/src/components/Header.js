import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <a href="#tours" onClick={() => setIsMobileMenuOpen(false)}>Туры</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>О нас</a>
            <a href="#contact" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Связаться
            </a>
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
