# Radio App (Next.js + Playlist API)

Готовый проект Next.js (App Router) с простым аудио-плеером и API, который подхватывает все файлы из `/public/music`.

## Как пользоваться
1. Скопируй свои `.mp3` в папку `public/music/`.
2. Локально (если нужно): `npm install` → `npm run dev` → зайди на http://localhost:3000
3. Для деплоя на Timeweb Cloud (Apps → Next.js):
   - Залей архив проекта или подключи репозиторий.
   - Сборка выполнится автоматически: `npm install` и `npm run build`.
   - Старт: `npm start`.

## Структура
- `app/page.js` — UI плеера
- `app/api/playlist/route.js` — API, читает список файлов из `/public/music`
- `public/music` — сюда кладёшь `.mp3`

Удачи!
