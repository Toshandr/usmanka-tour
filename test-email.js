require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🧪 Тестирование отправки email...\n');

// Проверка наличия пароля
if (!process.env.EMAIL_PASS) {
  console.error('❌ Ошибка: EMAIL_PASS не установлен в .env файле');
  console.log('\n📝 Инструкция:');
  console.log('1. Создайте файл .env в корне проекта');
  console.log('2. Добавьте строку: EMAIL_PASS=ваш_пароль_приложения');
  console.log('3. Получите пароль приложения на https://account.mail.ru/user/2-step-auth/passwords/');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.mail.ru',
  port: process.env.EMAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'antonnechlopochin@mail.ru',
    pass: process.env.EMAIL_PASS
  }
});

console.log('📧 Настройки email:');
console.log(`   Host: ${process.env.EMAIL_HOST || 'smtp.mail.ru'}`);
console.log(`   Port: ${process.env.EMAIL_PORT || 465}`);
console.log(`   User: ${process.env.EMAIL_USER || 'antonnechlopochin@mail.ru'}`);
console.log(`   Pass: ${'*'.repeat(process.env.EMAIL_PASS.length)}\n`);

console.log('📤 Отправка тестового письма...\n');

transporter.sendMail({
  from: `"Усманка-уикенд TEST" <${process.env.EMAIL_USER || 'antonnechlopochin@mail.ru'}>`,
  to: 'antonnechlopochin@mail.ru',
  subject: '✅ Тест отправки email - Усманка-уикенд',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 20px; border-radius: 8px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Тест успешен!</h1>
          <p>Усманка-уикенд</p>
        </div>
        <div class="content">
          <div class="success">
            <h2>🎉 Email настроен правильно!</h2>
            <p>Система отправки уведомлений работает корректно.</p>
            <p><strong>Дата теста:</strong> ${new Date().toLocaleString('ru-RU')}</p>
          </div>
          <p style="margin-top: 20px; text-align: center; color: #666;">
            Теперь вы будете получать уведомления о новых бронированиях на этот email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
✅ Тест успешен!

Email настроен правильно!
Система отправки уведомлений работает корректно.

Дата теста: ${new Date().toLocaleString('ru-RU')}

Теперь вы будете получать уведомления о новых бронированиях на этот email.
  `
}).then((info) => {
  console.log('✅ Email отправлен успешно!');
  console.log(`   Message ID: ${info.messageId}`);
  console.log(`\n📬 Проверьте почту antonnechlopochin@mail.ru`);
  console.log('   (Если письма нет, проверьте папку "Спам")\n');
}).catch((error) => {
  console.error('❌ Ошибка при отправке email:');
  console.error(`   ${error.message}\n`);
  
  if (error.message.includes('Invalid login')) {
    console.log('💡 Возможные причины:');
    console.log('   1. Неверный пароль приложения');
    console.log('   2. Двухфакторная аутентификация не включена');
    console.log('   3. Неверный email адрес\n');
    console.log('📝 Решение:');
    console.log('   1. Перейдите: https://account.mail.ru/user/2-step-auth/passwords/');
    console.log('   2. Создайте новый пароль приложения');
    console.log('   3. Обновите EMAIL_PASS в .env файле\n');
  } else if (error.message.includes('timeout') || error.message.includes('ECONNREFUSED')) {
    console.log('💡 Возможные причины:');
    console.log('   1. Проблемы с интернет-соединением');
    console.log('   2. Блокировка файрволом');
    console.log('   3. Неверные настройки порта\n');
  }
});
