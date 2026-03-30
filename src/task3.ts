/*
Задание 3: Реализуйте memoize для функций

Ограничения:
- Аргументы функции — только строки или числа (для упрощения)
- Кэшируйте результат по аргументам
*/

type AllowedArg = string | number;

function memoize<T, Args extends AllowedArg[], P>(fn: (...args: Args) => T): (...args: Args) => T {
    const cache = new Map<string, T>(); // даем Мап для хранения кэша

    return function (this: unknown, ...args: Args) : T {
        const key = args.join(','); // достаём аргументы входящей функции, кладем их в строку
        /* проверка, есть ли значения в кэше, если да,
         то сразу достаем значения и не
         тратим вычислительные мощности */
        const value = cache.get(key);
        if (value !== undefined) {
            console.log('cache key:', key);
            return value;
        }
        // иначе просто считаем функцию и запоминаем ее результат
        const result : T = fn.apply(this, args);
        console.log('cache set:', key, result);
        cache.set(key, result);
        return result;
    }
}

const slowAdd = (a : number, b : number) => {
    return a + b;
};

const memoAdd = memoize(slowAdd);
console.log(memoAdd(1, 2)); // возвращает 3
console.log(memoAdd(1, 2)); // из кэша,  возвращает 3