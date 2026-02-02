// Конфигурация проекта Усманка-уикенд (из config.py)

module.exports = {
  CONTACT_PHONE: process.env.CONTACT_PHONE || '+7 (900) 123-45-67',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'info@usmanka-weekend.ru',
  CONTACT_ADDRESS: process.env.CONTACT_ADDRESS || 'г. Воронеж, пл. Ленина',
  EVENT_DATE: process.env.EVENT_DATE || '20-21 июня 2026',
  DEPARTURE_TIME: process.env.DEPARTURE_TIME || '09:00',
  DEPARTURE_PLACE: process.env.DEPARTURE_PLACE || 'пл. Ленина, Воронеж'
};
