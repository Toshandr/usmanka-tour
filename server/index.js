const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const config = require('./config');
const toursData = require('./data/tours');

// EJS для рендера страницы тура
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.mail.ru',
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'antonnechlopochin@mail.ru',
    pass: process.env.EMAIL_PASS
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Статические файлы (HTML, CSS, JS) — без предзагрузки страницы
app.use(express.static(path.join(__dirname, '..', 'public')));

// Подготовка тура для шаблона: schedule_day1/day2, for_you, faq_extra
function prepareTourForTemplate(tour, tourKey) {
  if (!tour) return null;
  const schedule_day1 = (tour.schedule && tour.schedule.day1)
    ? tour.schedule.day1.map(function (item) {
        return { time: item.time, title: item.title, desc: item.location || '' };
      })
    : [];
  const schedule_day2 = (tour.schedule && tour.schedule.day2)
    ? tour.schedule.day2.map(function (item) {
        return { time: item.time, title: item.title, desc: item.location || '' };
      })
    : [];
  const faq_extra = tour.faq_extra || [];
  return {
    title: tour.title,
    description: tour.description,
    image: tour.image || ('https://via.placeholder.com/1200x600/4CAF50/FFFFFF?text=' + encodeURIComponent(tour.shortTitle || tour.title)),
    architecture: tour.architecture || [],
    for_you: tour.forYou || tour.for_you || [],
    schedule_day1: schedule_day1,
    schedule_day2: schedule_day2,
    benefits: tour.benefits || [],
    tariffs: tour.tariffs || [],
    leaders: tour.leaders || [],
    included: tour.included || [],
    what_to_bring: tour.what_to_bring || [],
    faq_extra: faq_extra,
    conditions: tour.conditions || { included: [], toBring: [] },
    faq: tour.faq || []
  };
}

// Главная страница
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Страница тура
app.get('/tour/:tourKey', function (req, res) {
  const tourKey = req.params.tourKey;
  const tour = toursData[tourKey];
  if (!tour) {
    return res.status(404).send('Тур не найден');
  }
  const tourView = prepareTourForTemplate(tour, tourKey);
  res.render('tour', {
    tour: tourView,
    tour_key: tourKey,
    contact_phone: config.CONTACT_PHONE,
    contact_email: config.CONTACT_EMAIL,
    event_date: config.EVENT_DATE,
    departure_place: config.DEPARTURE_PLACE
  });
});

// API
app.get('/api/health', function (req, res) {
  res.json({ status: 'ok', message: 'Сервер работает' });
});

app.get('/api/tours', function (req, res) {
  res.json(toursData);
});

app.get('/api/tours/:tourKey', function (req, res) {
  const tour = toursData[req.params.tourKey];
  if (!tour) return res.status(404).json({ error: 'Тур не найден' });
  res.json(tour);
});

app.post('/api/booking', async function (req, res) {
  try {
    const { name, phone, email, tour, tariff, amount } = req.body;
    if (!name || !phone || !email || !tour || !tariff) {
      return res.status(400).json({ error: 'Все поля обязательны для заполнения' });
    }
    const amountStr = String(amount || '').replace(/\s/g, '');
    const amountNum = parseInt(amountStr, 10) || 0;
    console.log('Новая заявка:', { name, phone, email, tour, tariff, amount: amountStr });

    const tourData = toursData[tour];
    const tourTitle = tourData ? tourData.title : tour;

    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h1>Новая заявка на бронирование</h1>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Тур:</strong> ${tourTitle}</p>
          <p><strong>Тариф:</strong> ${tariff}</p>
          <p><strong>Сумма:</strong> ${amountStr} ₽</p>
          <p>Дата: ${new Date().toLocaleString('ru-RU')}</p>
        </div>
      </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: `"Усманка-уикенд" <${process.env.EMAIL_USER || 'antonnechlopochin@mail.ru'}>`,
        to: process.env.EMAIL_TO || 'antonnechlopochin@mail.ru',
        subject: 'Новая заявка: ' + tourTitle + ' - ' + name,
        html: emailHTML,
        text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nТур: ${tourTitle}\nТариф: ${tariff}\nСумма: ${amountStr} ₽`
      });
    } catch (emailError) {
      console.error('Ошибка отправки email:', emailError);
    }

    res.json({
      status: 'success',
      message: 'Заявка принята! Мы свяжемся с вами в ближайшее время.',
      data: { name, phone, tour, tariff, amount: amountStr }
    });
  } catch (error) {
    console.error('Ошибка при обработке заявки:', error);
    res.status(500).json({ error: 'Ошибка при обработке заявки. Попробуйте позже.' });
  }
});

// SPA fallback не используем — только статика и маршруты выше
app.listen(PORT, function () {
  console.log('Сервер запущен на порту ' + PORT);
  console.log('http://localhost:' + PORT);
});
