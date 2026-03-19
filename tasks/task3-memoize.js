/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

function memoize(fn) {
    const cache = new Map(); // даем Мап для хранения кэша

    return function (...args) {
        const key = args.join(','); // достаём аргументы входящей функции, кладем их в строку
        /* проверка, есть ли значения в кэше, если да,
         то сразу достаем значения и не
         тратим вычислительные мощности */
        if (cache.has(key)) {
            console.log('cache key:', key);
            return cache.get(key);
        }
        // иначе просто считаем функцию и запоминаем ее результат
        const result = fn.apply(this, args);
        console.log('cache set:', key, result);
        cache.set(key, result);
        return result;
    }
}

const slowAdd = (a, b) => {
  return a + b;
};

const memoAdd = memoize(slowAdd);
console.log(memoAdd(1, 2)); // возвращает 3
console.log(memoAdd(1, 2)); // из кэша,  возвращает 3