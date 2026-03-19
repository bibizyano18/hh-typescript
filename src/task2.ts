/*
Задание 2: Реализуйте delay

Требования:
- delay(ms) возвращает промис
- Промис резолвится через ms миллисекунд
*/
function delay(ms: number): Promise<void> {
    if (ms < 0) {
        return Promise.reject(new Error('ms must be non-negative'));
    }
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    });
}

delay(500).then(() => console.log("Готово через 500мс"));