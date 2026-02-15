import React from 'react';
import './TariffDetailsModal.css';

const TariffDetailsModal = ({ tariff, onClose }) => {
  if (!tariff || !tariff.details) return null;

  return (
    <div className="tariff-modal-overlay" onClick={onClose}>
      <div className="tariff-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="tariff-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <h2 className="tariff-modal-title">{tariff.name}</h2>
        <div className="tariff-modal-price">{tariff.price.toLocaleString('ru-RU')} ₽</div>

        <div className="tariff-details-table">
          <div className="tariff-detail-row">
            <div className="tariff-detail-label">
              <i className="fas fa-calendar-check"></i>
              Мероприятия 2го дня
            </div>
            <div className="tariff-detail-value">{tariff.details.day2Events}</div>
          </div>

          <div className="tariff-detail-row">
            <div className="tariff-detail-label">
              <i className="fas fa-bed"></i>
              Категория номера
            </div>
            <div className="tariff-detail-value">{tariff.details.roomCategory}</div>
          </div>

          <div className="tariff-detail-row">
            <div className="tariff-detail-label">
              <i className="fas fa-users"></i>
              Вид размещения
            </div>
            <div className="tariff-detail-value">{tariff.details.accommodationType}</div>
          </div>

          <div className="tariff-detail-row">
            <div className="tariff-detail-label">
              <i className="fas fa-wine-glass"></i>
              Винная дегустация
            </div>
            <div className="tariff-detail-value">{tariff.details.wineTasting}</div>
          </div>

          <div className="tariff-detail-row">
            <div className="tariff-detail-label">
              <i className="fas fa-fire"></i>
              Ужин у костра
            </div>
            <div className="tariff-detail-value">{tariff.details.dinnerAtFire}</div>
          </div>
        </div>

        <div className="tariff-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default TariffDetailsModal;
