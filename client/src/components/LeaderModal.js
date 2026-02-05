import React from 'react';
import './LeaderModal.css';

const LeaderModal = ({ isOpen, onClose, leader }) => {
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

  if (!isOpen || !leader) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="leader-modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          <i className="fas fa-times"></i>
        </button>

        <div className="leader-modal-layout">
          {/* Левая часть - фото, имя, роль */}
          <div className="leader-modal-left">
            {leader.image ? (
              <img src={leader.image} alt={leader.name} className="leader-modal-image" />
            ) : (
              <div className="leader-modal-icon">
                <i className="fas fa-user"></i>
              </div>
            )}
            <h2 className="leader-modal-name">{leader.name}</h2>
            <p className="leader-modal-role">{leader.role}</p>
          </div>

          {/* Правая часть - информация */}
          <div className="leader-modal-right">
            {/* История ведущего */}
            <div className="leader-story">
              <p>Здесь будет ваша небольшая история</p>
            </div>

            <h3 className="leader-modal-title">О ведущем</h3>
            {leader.details && leader.details.length > 0 ? (
              <ul className="leader-modal-details">
                {leader.details.map((detail, index) => (
                  <li key={index}>
                    <i className="fas fa-check-circle"></i>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="leader-modal-no-details">
                Информация о ведущем будет добавлена позже
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderModal;
