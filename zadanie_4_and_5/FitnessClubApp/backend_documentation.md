# Backend Documentation: Фитнес-клуб «ИМПУЛЬС»

## 1. Архитектура

Frontend (React + Vite + Tailwind) → Supabase (PostgreSQL + REST API + Auth + RLS).

Проект использует Supabase как Backend-as-a-Service. Это даёт готовый REST API, аутентификацию и защиту данных через RLS без необходимости писать собственный сервер.

## 2. База данных

### Таблица `trainings` — тренировки

| Поле | Тип | Описание |
|---|---|---|
| id | bigint (PK) | Идентификатор |
| title | text | Название |
| date | date | Дата |
| time | time | Время |
| type | text | Тип (Йога / Силовая / Кардио) |
| trainer | text | Тренер |
| place | text | Место |
| slots | integer | Свободных мест |
| created_at | timestamptz | Дата создания |

### Таблица `bookings` — записи

| Поле | Тип | Описание |
|---|---|---|
| id | bigint (PK) | Идентификатор |
| user_id | uuid (FK → auth.users) | Владелец |
| training_id | bigint (FK → trainings) | Тренировка |
| created_at | timestamptz | Дата создания |

**Ограничение:** `UNIQUE (user_id, training_id)` — нельзя записаться дважды.

## 3. RLS-политики

RLS включён на обеих таблицах.

**trainings:**

- SELECT — для всех (`anon` + `authenticated`).

**bookings:**

- SELECT — только свои (`auth.uid() = user_id`).
- INSERT — только для себя.
- DELETE — только свои.

Смысл: расписание видят все, записи — только их владелец.

## 4. Аутентификация

Supabase Auth, email + пароль. Форма приложения требует пароль длиной не менее 8 символов. Подтверждение email отключено для удобства тестирования.

Методы:

- `supabase.auth.signUp({ email, password })`
- `supabase.auth.signInWithPassword({ email, password })`
- `supabase.auth.signOut()`

## 5. API Endpoints (автогенерируемые Supabase)

**Получить тренировки:**

```http
GET https://<проект>.supabase.co/rest/v1/trainings?select=*
```

**Создать запись:**

```http
POST https://<проект>.supabase.co/rest/v1/bookings
Content-Type: application/json

{
  "training_id": 1,
  "user_id": "<uuid>"
}
```

**Удалить запись:**

```http
DELETE https://<проект>.supabase.co/rest/v1/bookings?id=eq.<id>
```

## 6. Примеры запросов из Frontend

```javascript
// Загрузка тренировок
const { data } = await supabase.from('trainings').select('*');

// Запись на тренировку
const { error } = await supabase
  .from('bookings')
  .insert({ training_id: training.id, user_id: user.id });

// Регистрация
const { data, error } = await supabase.auth.signUp({ email, password });

// Вход
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
```

## 7. Обработка ошибок

| Ошибка | Обработка |
|---|---|
| Сетевая (DNS, timeout) | Таймаут 10 сек, error-toast |
| 401 | Открытие формы входа |
| 403 (RLS) | Error-toast «Не удалось записаться» |
| Пустая выборка | Empty-state |
| Неверный пароль | Error-toast |

Логирование через Supabase Logs (в дашборде).

## 8. Переменные окружения

`.env.local` (не коммитится):

```env
VITE_SUPABASE_URL=https://<проект>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable key>
```

`.env.example` (для GitHub) — те же переменные с пустыми значениями.

`.env.local` добавлен в `.gitignore`.

## 9. Процесс разработки с AI

Backend и интеграция реализованы через AI-агента Codex.

**Промпты:**

- Проектирование SQL-схемы с RLS-политиками.
- Замена mock-данных на реальную загрузку через хук `useTrainings`.
- Создание `AuthForm.jsx` и `useAuth.js`.

**Проблемы и решения:**

- Опечатка в Project URL Supabase приводила к DNS-ошибке → URL исправлен и проверен через REST API и `supabase-js`.
- Занятый порт 5173 → Vite переключился на 5174.
- `user_id: null` блокировал запись → добавлена аутентификация и запись с `user.id`.

**Результат:** 4 теста проходят, build успешен, end-to-end работает.

## 10. Развёртывание

### Как развернуть Backend

1. Создайте проект на database.new
2. Скопируйте Project URL и Publishable key
3. Выполните SQL из supabase/migrations/001_init.sql в SQL Editor
4. Создайте .env.local с вашими ключами:
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
5. Включите Email/Password в Authentication → Providers
6. Отключите Confirm email
7. Настройте URL Configuration: http://localhost:5173
8. npm install
9. npm run dev
