# Домашние задания

Репозиторий с домашними заданиями

## Содержание

### 📁 [zadanie_1_and_2](./zadanie_1_and_2) — Калькулятор + AI-правила

**ДЗ 1: Калькулятор на HTML/CSS/JS, созданный через Cline + DeepSeek**
- Простое веб-приложение калькулятора
- Создано через AI-агента Cline с подключением OpenRouter + DeepSeek

**ДЗ 2: Системные правила и промпт-шаблоны для AI**
- Файл системных правил (аналог .cursorrules)
- Библиотека из 5 промпт-шаблонов по структуре RTCF
- Применение Chain-of-Thought техники
- Сравнение результатов с правилами и без

### 📁 [zadanie_3](./zadanie_3) — UI-концепции + ТЗ + User Stories

**ДЗ 3: Проектирование фитнес-клуба**
- Описание проекта и целевой аудитории
- 3 UI-концепции интерфейса (минимализм, яркая, корпоративная)
- User Story Mapping с критериями приёмки (Given-When-Then)
- Техническое задание в формате Markdown

### 📁 [zadanie_4_and_5](./zadanie_4_and_5) — React-приложение + Backend

**ДЗ 4: Frontend-приложение «Фитнес-клуб ИМПУЛЬС»**
- React 18 + Vite + Tailwind CSS
- 3 функции MVP: расписание, фильтрация, запись
- Адаптивная вёрстка (1/2/3 колонки)
- 4 автотеста (Vitest + React Testing Library)

**ДЗ 5: Backend на Supabase + интеграция**
- PostgreSQL база данных (таблицы trainings, bookings)
- Supabase Auth (регистрация/вход)
- Row Level Security (RLS-политики)
- REST API от Supabase
- Обработка ошибок, логирование

## Стек

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, RLS)
- **Тесты:** Vitest, React Testing Library
- **AI-инструменты:** Cline, Codex, DeepSeek, OpenRouter, ChatGPT

## Как запустить приложение (ДЗ 4–5)

```bash
cd zadanie_4_and_5/FitnessClubApp
npm install
npm run dev
