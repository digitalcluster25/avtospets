# Автоспецпром Frontend

Headless-фронт под WordPress для промо-сайта `Автоспецпром`.

## Стек

- Next.js 16, App Router, TypeScript
- CSS Modules + CSS Variables
- WPGraphQL + Apollo Client
- ISR и ручной `revalidate`

## Быстрый старт

```bash
npm install
npm run dev
```

Создайте `.env.local` на основе `.env.example`.

## Переменные окружения

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WORDPRESS_GRAPHQL_ENDPOINT=https://example.com/graphql
WORDPRESS_REVALIDATE_SECRET=change-me
CONTACT_WEBHOOK_URL=https://example.com/contact-webhook
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk...
```

## Что уже готово

- CMS-driven маршруты для страниц промо-сайта
- страницы:
  - `/`
  - `/avtomobili-type-a`
  - `/avtomobili-type-b`
  - `/avtomobili-type-c`
  - `/avtomobili-type-social`
  - `/production`
  - `/services`
  - `/sertifications`
  - `/aboutus`
  - `/testimonials`
  - `/contacts`
- SSR/ISR через App Router
- endpoint `POST /api/revalidate`
- fallback-данные для локальной разработки без WordPress
- подключение контента через `nodeByUri` из WPGraphQL

## Что подключать дальше

1. Настроить `WORDPRESS_GRAPHQL_ENDPOINT`
2. Добавить в WordPress нужные поля и типы контента
3. Привязать webhook публикации к `/api/revalidate`
4. Перенести точные секции из Figma в WP-схему

## Production deploy

Фронтенд подготовлен для Docker + Traefik на `avtospets.spaces.community`.

1. На VPS создайте файл `/opt/avtospets/.env.production` по шаблону `.env.production.example`.
2. Один раз подготовьте сервер через `ops/bootstrap-server.sh`, если Docker ещё не установлен.
3. Для первого ручного запуска выполните `ops/deploy.sh` на VPS.
4. Для автодеплоя добавьте в GitHub Secrets:
   - `VPS_HOST`
   - `VPS_USER`
   - `VPS_SSH_KEY`
   - `VPS_PORT` при нестандартном порте
   - `APP_DIR`, `ENV_FILE`, `REPO_URL` при необходимости переопределить значения по умолчанию

После каждого пуша в `main` workflow `.github/workflows/deploy.yml` обновит код на VPS и пересоберёт контейнер.
