import React from 'react';
import './InProgress.css';

const InProgress = () => {
  return (
    <div className="in-progress-page">
      <div className="container">
        <div className="in-progress-content">
          <div className="progress-icon">
            <i className="fas fa-tools"></i>
          </div>
          <div className="progress-badge">В разработке</div>
          <h1 className="progress-title">Страница в разработке</h1>
          <p className="progress-description">
            Мы работаем над этим разделом. Скоро здесь появится что-то интересное!
          </p>
          <div className="progress-features">
            <div className="progress-feature">
              <i className="fas fa-check-circle"></i>
              <span>Новый функционал</span>
            </div>
            <div className="progress-feature">
              <i className="fas fa-check-circle"></i>
              <span>Улучшенный дизайн</span>
            </div>
            <div className="progress-feature">
              <i className="fas fa-check-circle"></i>
              <span>Больше возможностей</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InProgress;
