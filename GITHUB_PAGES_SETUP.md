# Настройка GitHub Pages

## Быстрая настройка

1. **Загрузите код в GitHub репозиторий**
   ```bash
   git add .
   git commit -m "Подготовка к деплою на GitHub Pages"
   git push origin main
   ```

2. **Включите GitHub Pages**
   - Перейдите в Settings репозитория
   - Найдите раздел "Pages"
   - В "Source" выберите "GitHub Actions"
   - **Важно**: Убедитесь, что в Settings → Actions → General разрешены "Read and write permissions"

3. **Автоматический деплой**
   - При каждом push в main ветку сайт будет автоматически обновляться
   - Процесс займет 2-3 минуты
   - Сайт будет доступен по адресу: `https://ваш-username.github.io/название-репозитория`

## Настройка разрешений (важно!)

Если деплой не работает, проверьте разрешения:

1. **Settings → Actions → General**
2. В разделе "Workflow permissions" выберите:
   - ✅ "Read and write permissions"
   - ✅ "Allow GitHub Actions to create and approve pull requests"

## Ручной деплой (альтернатива)

Если нужно развернуть вручную:

```bash
cd client
npm install
npm run build
npm run deploy
```

## Что настроено

✅ **React Router** переключен на HashRouter для GitHub Pages  
✅ **404.html** создан для поддержки SPA  
✅ **GitHub Actions** настроен с правильными разрешениями  
✅ **Бронирование** работает через mailto (без бэкенда)  
✅ **Все зависимости** от сервера убраны  

## Структура URL

- Главная: `https://ваш-сайт.github.io/`
- Туры: `https://ваш-сайт.github.io/#/tour/dance`

## Настройка домена (опционально)

1. В настройках GitHub Pages укажите свой домен
2. Добавьте файл `client/public/CNAME` с вашим доменом
3. Настройте DNS записи у регистратора домена

## Поддержка

Если что-то не работает:
1. Проверьте Actions в GitHub (вкладка Actions)
2. Убедитесь, что GitHub Pages включен
3. Проверьте разрешения Actions (Settings → Actions → General)
4. Убедитесь, что main ветка содержит все файлы

## Альтернативный способ (если Actions не работают)

Можно использовать ручной деплой через gh-pages:

```bash
# В папке client
npm run deploy
```

Это создаст ветку `gh-pages` и загрузит туда собранные файлы.