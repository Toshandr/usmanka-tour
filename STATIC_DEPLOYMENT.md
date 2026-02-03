# Статический деплой на Netlify

## Быстрый старт

### 1. Локальное тестирование

```bash
# Установить зависимости
npm install
cd client && npm install
cd ..

# Собрать React приложение
npm run build:static

# Проверить собранный сайт (опционально)
cd client
npm install -g serve
serve -s build
```

### 2. Деплой на Netlify

#### Способ A: Через веб-интерфейс (проще)

1. Залейте код на GitHub
2. Перейдите на [netlify.com](https://netlify.com)
3. Нажмите **"New site from Git"**
4. Выберите GitHub и репозиторий `usmanka-tour`
5. Netlify автоматически прочитает `netlify.toml` и развернёт сайт

#### Способ B: Через CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Файлы конфигурации

### `netlify.toml`
- **Build command**: `cd client && npm run build`
- **Publish directory**: `client/build`
- **Редирект**: все маршруты → `index.html` (для React Router)
- **Кэширование**: оптимальное для статических файлов

### `.netlifyignore`
- Исключает ненужные файлы из деплоя (Python код, Node.js сервер и т.д.)
- Оставляет только React приложение

## Что происходит при деплое?

1. Netlify запускает `cd client && npm run build`
2. React компилируется в статические файлы в папку `client/build`
3. Содержимое `client/build` загружается на CDN
4. Всем маршрутам нужен `index.html` для SPA → настроено в `netlify.toml`
5. Включен HTTPS, кэширование и оптимизация

## Результат

- ✅ Сайт будет доступен по адресу: `https://ваше-имя.netlify.app`
- ✅ Автоматический деплой при каждом `git push` в main
- ✅ HTTPS по умолчанию
- ✅ Глобальный CDN
- ✅ Отсутствие серверных затрат

## Изменение доменного имени

1. В Netlify: **Site settings** → **Domain management**
2. Добавьте свой домен или используйте Netlify subdomain

## Полная документация

See `NETLIFY_DEPLOYMENT.md` для детального руководства.
