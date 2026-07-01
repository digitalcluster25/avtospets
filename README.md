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
