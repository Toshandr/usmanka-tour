# Инструкция по развертыванию

## Требования

- Python 3.8+
- pip
- Виртуальное окружение (рекомендуется)

## Локальная разработка

### 1. Клонирование и настройка

```bash
# Создайте виртуальное окружение
python -m venv venv

# Активируйте его
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Установите зависимости
pip install -r requirements.txt
```

### 2. Настройка конфигурации

Отредактируйте файл `config.py`:
- Укажите реальные контактные данные
- Добавьте ключи для ЮKassa (если используете)
- Настройте социальные сети

### 3. Запуск

```bash
python main.py
```

Сайт будет доступен по адресу: http://localhost:8000

## Развертывание на сервере

### Вариант 1: VPS/VDS (Ubuntu)

```bash
# Обновите систему
sudo apt update && sudo apt upgrade -y

# Установите Python и зависимости
sudo apt install python3-pip python3-venv nginx -y

# Клонируйте проект
git clone <your-repo-url>
cd usmanka-weekend

# Создайте виртуальное окружение
python3 -m venv venv
source venv/bin/activate

# Установите зависимости
pip install -r requirements.txt

# Установите Gunicorn
pip install gunicorn

# Запустите приложение
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Вариант 2: Systemd Service

Создайте файл `/etc/systemd/system/usmanka.service`:

```ini
[Unit]
Description=Usmanka Weekend FastAPI
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/to/usmanka-weekend
Environment="PATH=/path/to/usmanka-weekend/venv/bin"
ExecStart=/path/to/usmanka-weekend/venv/bin/gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

[Install]
WantedBy=multi-user.target
```

Запустите сервис:

```bash
sudo systemctl start usmanka
sudo systemctl enable usmanka
```

### Настройка Nginx

Создайте файл `/etc/nginx/sites-available/usmanka`:

```nginx
server {
    listen 80;
    server_name your-domain.ru www.your-domain.ru;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static {
        alias /path/to/usmanka-weekend/static;
    }
}
```

Активируйте конфигурацию:

```bash
sudo ln -s /etc/nginx/sites-available/usmanka /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL сертификат (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.ru -d www.your-domain.ru
```

## Настройка оплаты ЮKassa

1. Зарегистрируйтесь на https://yookassa.ru/
2. Получите Shop ID и Secret Key
3. Обновите `config.py` и `static/js/common.js`
4. Настройте webhook для уведомлений о платежах

## Мониторинг

Проверка логов:

```bash
# Логи приложения
sudo journalctl -u usmanka -f

# Логи Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Резервное копирование

Регулярно создавайте резервные копии:
- Базы данных (если используется)
- Файлов конфигурации
- Статических файлов

## Обновление

```bash
cd /path/to/usmanka-weekend
git pull
source venv/bin/activate
pip install -r requirements.txt
sudo systemctl restart usmanka
```

## Поддержка

При возникновении проблем:
1. Проверьте логи
2. Убедитесь, что все зависимости установлены
3. Проверьте права доступа к файлам
4. Убедитесь, что порты не заняты другими приложениями
