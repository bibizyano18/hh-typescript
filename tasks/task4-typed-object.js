/*
Задание 4: Реализуйте typedObject

Цель:
- Создать объект на основе схемы ожидаемых типов
- При присваивании проверять тип и бросать ошибку при несоответствии
*/

function typedObject(schema) {

    return new Proxy({}, {
        set(target, key, value, receiver) {
            if (!(key in schema)) {
                throw new TypeError(`Отсутствует ключ "${key}"`);
            }

            if (typeof value !== schema[key]) {
                throw new TypeError(`Неверный тип данных`);
            }

            return Reflect.set(target, key, value, receiver); // добавил reflect
        },
        // чтение можем не перехватывать
        // get(target, key) {
        //     return target[key];
        // }
    });
}

const user = typedObject({
    name: "string",
    age: "number",
});

try {
    user.name = "Ivan"; // выполнится
    console.log(user.name); // "Ivan"

    user.name = "20";      // выполнится
    console.log(user.name); // 20

    user.age = "20";    // должно выбросить ошибку
} catch (error) {
    console.error(error.message);
}