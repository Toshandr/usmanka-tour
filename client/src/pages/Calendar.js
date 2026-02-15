import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  // Данные о турах с датами
  const tourEvents = [
    {
      tourId: 'dance',
      name: 'Танцевальный уикенд',
      shortDescription: 'Хореография, видеосъёмка, йога и винная дегустация',
      price: 'от 8 000₽',
      startDate: new Date(2026, 5, 20), // 20 июня 2026
      endDate: new Date(2026, 5, 21),   // 21 июня 2026
      color: '#4CAF50',
      icon: 'fa-music'
    },
    {
      tourId: 'english',
      name: 'Английская Усманка',
      shortDescription: 'Языковое погружение, игры и квесты на английском',
      price: 'от 6 000₽',
      startDate: new Date(2026, 5, 27), // 27 июня 2026
      endDate: new Date(2026, 5, 28),   // 28 июня 2026
      color: '#FF9800',
      icon: 'fa-comments'
    },
    {
      tourId: 'culinary',
      name: 'Кулинарная Усманка',
      shortDescription: 'Мастер-классы от шеф-повара и винная дегустация',
      price: 'от 8 000₽',
      startDate: new Date(2026, 6, 4),  // 4 июля 2026
      endDate: new Date(2026, 6, 5),    // 5 июля 2026
      color: '#9C27B0',
      icon: 'fa-utensils'
    },
    {
      tourId: 'fitness',
      name: 'Фитнес Усманка',
      shortDescription: 'Йога, тренировки, сплавы и консультации по питанию',
      price: 'от 8 000₽',
      startDate: new Date(2026, 6, 11), // 11 июля 2026
      endDate: new Date(2026, 6, 12),   // 12 июля 2026
      color: '#2196F3',
      icon: 'fa-dumbbell'
    },
    {
      tourId: 'fitness-dating',
      name: 'Фитнес-знакомства',
      shortDescription: 'Знакомства через спорт и парные тренировки',
      price: 'от 10 000₽',
      startDate: new Date(2026, 6, 18), // 18 июля 2026
      endDate: new Date(2026, 6, 19),   // 19 июля 2026
      color: '#E91E63',
      icon: 'fa-heart'
    },
    {
      tourId: 'guitar',
      name: 'Гитара-Усманка',
      shortDescription: 'Обучение игре на гитаре с нуля за выходные',
      price: 'от 5 000₽',
      startDate: new Date(2026, 6, 25), // 25 июля 2026
      endDate: new Date(2026, 6, 26),   // 26 июля 2026
      color: '#FF5722',
      icon: 'fa-guitar'
    }
  ];

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const getTourForDate = (date) => {
    return tourEvents.find(tour => {
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      const start = new Date(tour.startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(tour.endDate);
      end.setHours(0, 0, 0, 0);
      return checkDate >= start && checkDate <= end;
    });
  };

  const getTourPosition = (date, tour) => {
    if (!tour) return null;
    
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    const start = new Date(tour.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(tour.endDate);
    end.setHours(0, 0, 0, 0);
    
    if (isSameDay(checkDate, start) && isSameDay(checkDate, end)) {
      return 'single';
    } else if (isSameDay(checkDate, start)) {
      return 'start';
    } else if (isSameDay(checkDate, end)) {
      return 'end';
    } else {
      return 'middle';
    }
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDay(null);
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDay(clickedDate);
  };

  const handleLegendItemClick = (tour) => {
    // Устанавливаем selectedDay на дату начала тура
    setSelectedDay(tour.startDate);
  };

  const handleGoToTour = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Пустые ячейки до первого дня месяца
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const tour = getTourForDate(date);
      const tourPosition = getTourPosition(date, tour);
      const isToday = isSameDay(date, new Date());
      const isSelected = selectedDay && isSameDay(date, selectedDay);

      days.push(
        <div
          key={day}
          className={`calendar-day ${tour ? 'has-event' : ''} ${tourPosition ? `tour-${tourPosition}` : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDayClick(day)}
          style={tour ? { 
            borderColor: tour.color,
            background: `linear-gradient(135deg, ${tour.color}15, ${tour.color}05)`
          } : {}}
        >
          <span className="day-number">{day}</span>
        </div>
      );
    }

    return days;
  };

  const selectedTour = selectedDay ? getTourForDate(selectedDay) : null;

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="month-nav-btn" onClick={handlePrevMonth}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <h2 className="calendar-title">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button className="month-nav-btn" onClick={handleNextMonth}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="calendar-weekdays">
          {weekDays.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {renderCalendarDays()}
        </div>

        <div className="calendar-legend">
          <h3>Запланированные туры:</h3>
          <div className="legend-items">
            {tourEvents.map(tour => (
              <button
                key={tour.tourId}
                className="legend-item"
                onClick={() => handleLegendItemClick(tour)}
              >
                <div className="legend-color" style={{ background: tour.color }}>
                  <i className={`fas ${tour.icon}`}></i>
                </div>
                <span>{tour.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedDay && (
        <div className="day-info-modal" onClick={() => setSelectedDay(null)}>
          <div className="day-info-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedDay(null)}>
              <i className="fas fa-times"></i>
            </button>
            
            {selectedTour ? (
              <>
                <div 
                  className="tour-info-icon"
                  style={{ background: selectedTour.color }}
                >
                  <i className={`fas ${selectedTour.icon}`}></i>
                </div>
                <h3 className="tour-info-title">{selectedTour.name}</h3>
                <p className="tour-info-date">
                  {selectedTour.startDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  {' — '}
                  {selectedTour.endDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="tour-info-description">
                  {selectedTour.shortDescription}
                </p>
                <div className="tour-info-price">
                  {selectedTour.price}
                </div>
                <button 
                  className="go-to-tour-btn"
                  onClick={() => handleGoToTour(selectedTour.tourId)}
                >
                  Подробнее о туре
                  <i className="fas fa-arrow-right"></i>
                </button>
              </>
            ) : (
              <>
                <div className="no-event-icon">
                  <i className="fas fa-calendar-times"></i>
                </div>
                <h3 className="no-event-title">На этот день пока ничего не запланировано</h3>
                <p className="no-event-text">
                  Выбранная дата: {selectedDay.toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
