const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST || 'smtp.mail.ru',
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'antonnechlopochin@mail.ru',
    pass: process.env.EMAIL_PASS
  }
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, phone, email, tour, tariff, amount } = JSON.parse(event.body);
    
    if (!name || !phone || !email || !tour || !tariff) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Все поля обязательны для заполнения' })
      };
    }

    const amountStr = String(amount || '').replace(/\s/g, '');
    console.log('Новая заявка:', { name, phone, email, tour, tariff, amount: amountStr });

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
          <p><strong>Тур:</strong> ${tour}</p>
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
        subject: 'Новая заявка: ' + tour + ' - ' + name,
        html: emailHTML,
        text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nТур: ${tour}\nТариф: ${tariff}\nСумма: ${amountStr} ₽`
      });
    } catch (emailError) {
      console.error('Ошибка отправки email:', emailError);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        status: 'success',
        message: 'Заявка принята! Мы свяжемся с вами в ближайшее время.',
        data: { name, phone, tour, tariff, amount: amountStr }
      })
    };
  } catch (error) {
    console.error('Ошибка при обработке заявки:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Ошибка при обработке заявки. Попробуйте позже.' })
    };
  }
};