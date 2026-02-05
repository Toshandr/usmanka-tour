import React from 'react';
import './SuccessModal.css';

const SuccessModal = ({ isOpen, onClose }) => {
  // Блокировка скролла при открытом модальном окне
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="success-modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          <i className="fas fa-times"></i>
        </button>

        <div className="success-content">
          <div className="success-icon">
            <div className="success-circle">
              <i className="fas fa-check"></i>
            </div>
          </div>
          
          <div className="success-message">
            <h2>Заявка подготовлена!</h2>
            <p>
              Вскоре по номеру телефона или по почте с вами свяжется наш администратор. 
              Ждём вас на нашем уикенде!
            </p>
          </div>

          <button 
            className="btn btn-primary success-btn"
            onClick={onClose}
          >
            Отлично!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;