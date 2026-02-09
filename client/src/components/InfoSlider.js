import React, { useState, useEffect } from 'react';
import './InfoSlider.css';

const InfoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Усманка Тур',
      description: 'это уникальная возможность провести выходные на природе с пользой для души и тела. Профессиональные инструкторы, живописные места и незабываемые впечатления ждут вас!',
      icon: 'fa-leaf',
      gradient: 'linear-gradient(135deg, #4CAF50, #FF9800)'
    },
    {
      title: 'Танцевальный уикенд',
      description: 'это погружение в мир движения и ритма. Профессиональная хореография, видеосъёмка клипов и атмосфера творчества на природе создадут незабываемые воспоминания.',
      icon: 'fa-music',
      gradient: 'linear-gradient(135deg, #4CAF50, #45a049)'
    },
    {
      title: 'Английская Усманка',
      description: 'это полное языковое погружение в естественной среде. Общение, игры и квесты на английском помогут преодолеть языковой барьер и обрести уверенность в разговоре.',
      icon: 'fa-comments',
      gradient: 'linear-gradient(135deg, #FF9800, #F57C00)'
    },
    {
      title: 'Кулинарная Усманка',
      description: 'это путешествие в мир высокой кухни и винной культуры. Мастер-классы от шеф-повара и дегустации откроют новые гастрономические горизонты.',
      icon: 'fa-utensils',
      gradient: 'linear-gradient(135deg, #9C27B0, #7B1FA2)'
    },
    {
      title: 'Фитнес Усманка',
      description: 'это гармония тела и духа на свежем воздухе. Йога, функциональные тренировки и активный отдых зарядят энергией на всю неделю.',
      icon: 'fa-dumbbell',
      gradient: 'linear-gradient(135deg, #2196F3, #1976D2)'
    },
    {
      title: 'Фитнес-знакомства',
      description: 'это новый формат знакомств через совместные тренировки и активности. Найдите единомышленника, который разделяет вашу любовь к здоровому образу жизни.',
      icon: 'fa-heart',
      gradient: 'linear-gradient(135deg, #E91E63, #C2185B)'
    },
    {
      title: 'Гитара-Усманка',
      description: 'это возможность научиться играть на гитаре с нуля за выходные. Песни у костра, дружеская атмосфера и первые аккорды под звёздным небом.',
      icon: 'fa-guitar',
      gradient: 'linear-gradient(135deg, #FF5722, #E64A19)'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

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
    <section className="info-slider">
      <div className="slider-container">
        <div className="slides-wrapper">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''} ${
                index === (currentSlide - 1 + slides.length) % slides.length ? 'prev' : ''
              } ${index === (currentSlide + 1) % slides.length ? 'next' : ''}`}
            >
              <div className="slide-content">
                <div 
                  className="slide-icon"
                  style={{ background: slide.gradient }}
                >
                  <i className={`fas ${slide.icon}`}></i>
                </div>
                <h3 className="slide-title">{slide.title}</h3>
                <p className="slide-description">
                  <span className="highlight">{slide.title}</span> — {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-btn prev-btn" onClick={prevSlide} aria-label="Предыдущий слайд">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-btn next-btn" onClick={nextSlide} aria-label="Следующий слайд">
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSlider;
