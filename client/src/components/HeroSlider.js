import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

// Import images
import sportsGirl from '../assets/images/beautiful-sports-girl-summer-park.jpg';
import musicWoman from '../assets/images/close-up-portrait-woman-listening-music-good-mood-dressed-gray-knitted-sweater.jpg';
import coupleTraining from '../assets/images/full-shot-couple-training-together.jpg';
import cakeDrink from '../assets/images/high-angle-delicious-cake-drink-table.jpg';
import mountainsLake from '../assets/images/mountains-lake.jpg';
import coupleGuitar from '../assets/images/couple-with-guitar.jpg';
import girlReading from '../assets/images/girl-sitting-grass-reading.jpg';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Усманка Тур',
      description: 'Активный отдых на природе в Воронежской области. Выберите свой формат: танцы, английский, кулинария, фитнес, знакомства или гитара',
      gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.4), rgba(255, 152, 0, 0.3))',
      image: mountainsLake
    },
    {
      title: 'Танцевальный уикенд',
      description: 'Погружение в мир движения и ритма. Профессиональная хореография, видеосъёмка клипов и атмосфера творчества на природе',
      icon: 'fa-music',
      gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.4), rgba(69, 160, 73, 0.3))',
      image: musicWoman
    },
    {
      title: 'Английская Усманка',
      description: 'Полное языковое погружение в естественной среде. Общение, игры и квесты на английском помогут преодолеть языковой барьер',
      icon: 'fa-comments',
      gradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.4), rgba(245, 124, 0, 0.3))',
      image: girlReading
    },
    {
      title: 'Кулинарная Усманка',
      description: 'Путешествие в мир высокой кухни и винной культуры. Мастер-классы от шеф-повара и дегустации откроют новые горизонты',
      icon: 'fa-utensils',
      gradient: 'linear-gradient(135deg, rgba(156, 39, 176, 0.4), rgba(123, 31, 162, 0.3))',
      image: cakeDrink
    },
    {
      title: 'Фитнес Усманка',
      description: 'Гармония тела и духа на свежем воздухе. Йога, функциональные тренировки и активный отдых зарядят энергией на всю неделю',
      icon: 'fa-dumbbell',
      gradient: 'linear-gradient(135deg, rgba(33, 150, 243, 0.4), rgba(25, 118, 210, 0.3))',
      image: sportsGirl
    },
    {
      title: 'Фитнес-знакомства',
      description: 'Новый формат знакомств через совместные тренировки и активности. Найдите единомышленника, который разделяет вашу любовь к ЗОЖ',
      icon: 'fa-heart',
      gradient: 'linear-gradient(135deg, rgba(233, 30, 99, 0.4), rgba(194, 24, 91, 0.3))',
      image: coupleTraining
    },
    {
      title: 'Гитара-Усманка',
      description: 'Возможность научиться играть на гитаре с нуля за выходные. Песни у костра, дружеская атмосфера и первые аккорды под звёздным небом',
      icon: 'fa-guitar',
      gradient: 'linear-gradient(135deg, rgba(255, 87, 34, 0.4), rgba(230, 74, 25, 0.3))',
      image: coupleGuitar
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length, currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="hero-background-image"
            onError={(e) => {
              console.error('Image failed to load:', slide.image);
              e.target.style.display = 'none';
            }}
          />
          <div className="hero-overlay" style={{ background: slide.gradient }}></div>
          <div className="container">
            <div className="hero-content">
              {slide.subtitle && (
                <span className="hero-badge">
                  {slide.subtitle}
                </span>
              )}
              <h1 className="hero-title">
                {slide.icon && <i className={`fas ${slide.icon}`}></i>}
                {slide.title}
              </h1>
              <p className="hero-description">
                {slide.description}
              </p>
              {slide.features && (
                <div className="hero-features">
                  {slide.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <i className={`fas ${feature.icon}`}></i>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <button className="hero-slider-btn prev-btn" onClick={prevSlide} aria-label="Предыдущий слайд">
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="hero-slider-btn next-btn" onClick={nextSlide} aria-label="Следующий слайд">
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="hero-slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
