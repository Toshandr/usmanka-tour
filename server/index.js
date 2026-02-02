const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Настройка транспорта для отправки email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.mail.ru',
  port: process.env.EMAIL_PORT || 465,
  secure: true, // true для 465, false для других портов
  auth: {
    user: process.env.EMAIL_USER || 'antonnechlopochin@mail.ru',
    pass: process.env.EMAIL_PASS // Пароль приложения
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Импорт данных туров
const toursData = require('./data/tours');

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Сервер работает' });
});

app.get('/api/tours', (req, res) => {
  res.json(toursData);
});

app.get('/api/tours/:tourKey', (req, res) => {
  const { tourKey } = req.params;
  const tour = toursData[tourKey];
  
  if (!tour) {
    return res.status(404).json({ error: 'Тур не найден' });
  }
  
  res.json(tour);
});

app.post('/api/booking', async (req, res) => {
  try {
    const { name, phone, email, tour, tariff, amount } = req.body;
    
    // Валидация
    if (!name || !phone || !email || !tour || !tariff) {
      return res.status(400).json({ 
        error: 'Все поля обязательны для заполнения' 
      });
    }
    
    console.log('Новая заявка:', { name, phone, email, tour, tariff, amount });
    
    // Получаем данные тура
    const tourData = toursData[tour];
    const tourTitle = tourData ? tourData.title : tour;
    
    // Формируем HTML письмо
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-block { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4CAF50; }
          .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
          .info-row:last-child { border-bottom: none; }
          .label { font-weight: bold; color: #666; }
          .value { color: #333; }
          .price { color: #4CAF50; font-size: 24px; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Новая заявка на бронирование!</h1>
            <p>Усманка-уикенд 20-21 июня 2026</p>
          </div>
          <div class="content">
            <div class="info-block">
              <h2 style="margin-top: 0; color: #4CAF50;">📋 Информация о клиенте</h2>
              <div class="info-row">
                <span class="label">Имя:</span>
                <span class="value">${name}</span>
              </div>
              <div class="info-row">
                <span class="label">Телефон:</span>
                <span class="value">${phone}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">${email}</span>
              </div>
            </div>

            <div class="info-block">
              <h2 style="margin-top: 0; color: #4CAF50;">🎫 Детали бронирования</h2>
              <div class="info-row">
                <span class="label">Тур:</span>
                <span class="value">${tourTitle}</span>
              </div>
              <div class="info-row">
                <span class="label">Тариф:</span>
                <span class="value">${tariff}</span>
              </div>
              <div class="info-row">
                <span class="label">Стоимость:</span>
                <span class="price">${amount.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0;"><strong>⏰ Действие:</strong> Свяжитесь с клиентом в ближайшее время для подтверждения бронирования!</p>
            </div>
          </div>
          <div class="footer">
            <p>Это автоматическое уведомление от системы бронирования Усманка-уикенд</p>
            <p>Дата получения: ${new Date().toLocaleString('ru-RU')}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Отправка email
    try {
      await transporter.sendMail({
        from: `"Усманка-уикенд" <${process.env.EMAIL_USER || 'antonnechlopochin@mail.ru'}>`,
        to: 'antonnechlopochin@mail.ru',
        subject: `🎫 Новая заявка: ${tourTitle} - ${name}`,
        html: emailHTML,
        text: `
Новая заявка на бронирование!

Клиент:
Имя: ${name}
Телефон: ${phone}
Email: ${email}

Бронирование:
Тур: ${tourTitle}
Тариф: ${tariff}
Стоимость: ${amount} ₽

Дата: ${new Date().toLocaleString('ru-RU')}
        `
      });

      console.log('✅ Email успешно отправлен на antonnechlopochin@mail.ru');
    } catch (emailError) {
      console.error('❌ Ошибка отправки email:', emailError);
      // Не прерываем выполнение, даже если email не отправился
    }
    
    res.json({
      success: true,
      message: 'Заявка принята! Мы свяжемся с вами в ближайшее время.',
      data: { name, phone, tour, tariff, amount }
    });
    
  } catch (error) {
    console.error('Ошибка при обработке заявки:', error);
    res.status(500).json({ 
      error: 'Ошибка при обработке заявки. Попробуйте позже.' 
    });
  }
});

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
