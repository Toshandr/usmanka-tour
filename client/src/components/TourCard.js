import React from 'react';
import { Link } from 'react-router-dom';
import './TourCard.css';

const TourCard = ({ tour }) => {
  return (
    <Link to={`/tour/${tour.id}`} className="tour-card glass card">
      <div className="tour-image">
        <div className="tour-badge" style={{ background: tour.color }}>
          {tour.duration}
        </div>
        <img src={tour.image} alt={tour.title} />
      </div>
      
      <div className="tour-content">
        <h3 className="tour-title">{tour.shortTitle}</h3>
        <p className="tour-description">{tour.description}</p>
        
        <div className="tour-footer">
          <div className="tour-price">
            <span className="price-label">от</span>
            <span className="price-value">{tour.price.toLocaleString('ru-RU')} ₽</span>
          </div>
          <div className="tour-link">
            Подробнее <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;
