# Шаг 5. Тестирование системы правил

## Задача для сравнения

Добавить в калькулятор обработку деления на ноль. Если пользователь делит на ноль — показывать «Ошибка» в поле результата.

Одна и та же задача была дана AI-агенту Cline дважды:
1. Без подключения файла правил `.clinerules`
2. С подключением файла правил `.clinerules`

---

## Прогон 1. БЕЗ применения правил

Агент работал без файла `.clinerules`. Полученный фрагмент функции `compute()`:

```javascript
case '/':
    if (curr === 0) {
        currentInput = 'Ошибка';
        operator = null;
        previousInput = '';
        resetScreen = true;
        updateDisplay();
        return;
    }
    result = prev / curr;
    break;

    ## Прогон 2. c применением правил

    case '/':
    // Проверка деления на ноль: выводим "Ошибка" и сбрасываем состояние
    if (curr === 0) {
        currentInput = 'Ошибка';
        operator = null;
        previousInput = '';
        resetScreen = true;
        updateDisplay();
        return;
    }
    result = prev / curr;
    break;