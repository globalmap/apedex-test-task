# Phantom Wallet - Solana Transfer App

Веб-додаток для підключення Phantom гаманця та відправки SOL в мережі Solana.

**Тестове завдання виконано на: React + TypeScript + SCSS + @solana/web3.js**

---

## 🚀 Швидкий старт

### 1. Встановлення залежностей

```bash
npm install
```

### 2. Запуск проекту

```bash
npm start
```

Додаток буде доступний за адресою: `http://localhost:5173`

---

## 📁 Структура проекту

```
phantom-wallet-app/
├── src/
│   ├── components/              # React компоненти
│   │   ├── WalletInfo.tsx       # Відображення адреси та балансу
│   │   ├── SendForm.tsx         # Форма відправки SOL
│   │   └── Message.tsx          # Повідомлення про статус операції
│   ├── hooks/
│   │   └── useWallet.ts         # Хук з логікою роботи з гаманцем
│   ├── utils/
│   │   ├── solana.ts            # Функції для роботи з Solana
│   │   └── phantom.ts           # Функції для роботи з Phantom
│   ├── types/
│   │   └── index.ts             # TypeScript типи та інтерфейси
│   ├── styles/                  # SCSS стилі
│   │   ├── App.scss
│   │   ├── WalletInfo.scss
│   │   ├── SendForm.scss
│   │   └── Message.scss
│   ├── config/
│   │   └── constants.ts         # Конфігурація (мережа, RPC endpoints)
│   ├── App.tsx                  # Головний компонент
│   └── index.tsx                # Точка входу
├── package.json
├── tsconfig.json
└── README.md
```

### Архітектурні рішення

- **Модульність:** Кожен компонент у своєму файлі з окремими стилями
- **Хуки:** Вся бізнес-логіка винесена в `useWallet` хук
- **Утиліти:** Функції для Solana та Phantom ізольовані
- **Типізація:** Строгі TypeScript типи для всіх даних
- **Конфігурація:** Єдина точка налаштування мережі

---

## 🛠️ Технології

- **React** - UI
- **TypeScript** - типізація та безпека коду
- **SCSS** - стилізація
- **@solana/web3.js** - взаємодія з блокчейном Solana
- **Phantom Wallet API** - підключення та підпис транзакцій

---

## 🔧 Конфігурація

### Зміна мережі

Файл: `src/config/constants.ts`

```typescript
// Для тестування (безкоштовні SOL)
export const NETWORK = 'devnet';

// Для реальних транзакцій
export const NETWORK = 'mainnet-beta';
```

### RPC Endpoints

- **Mainnet:** `https://api.mainnet-beta.solana.com`
- **Devnet:** `https://api.devnet.solana.com`

---

## 📊 Функціонал

### Основний функціонал
- [x] Підключення Phantom Wallet
- [x] Відображення адреси користувача (скорочено)
- [x] Відображення балансу SOL
- [x] Форма для введення адреси отримувача
- [x] Форма для введення суми SOL
- [x] Створення транзакції
- [x] Підпис через Phantom
- [x] Відправка в мережу Solana
- [x] Підтвердження транзакції
- [x] Повідомлення про успіх/помилку
- [x] Посилання на Solana Explorer

### Додатковий функціонал
- [x] Кнопка оновлення балансу
- [x] Тест з'єднання з мережею
- [x] Валідація балансу перед відправкою
- [x] Обробка помилок
- [x] Loading states
- [x] Адаптивний дизайн
