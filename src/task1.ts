function promiseAll<T>(args: T[]): Promise<T[]> {
    if (!Array.isArray(args)) {
        return Promise.reject(new TypeError('Args must be in an array'));
    }
    const promises = args.map(x => Promise.resolve(x));
    return new Promise((resolve, reject) => {
        let results: T[] = new Array(args.length);
        let completedPromises = 0; // счётчик выполненных промисов
        if (promises.length === 0) { // проверка, если нет аргументов
            resolve(results);
            return;
        }

        for (let i = 0; i < promises.length; i++) {
            promises[i].then((result) => {
                results[i] = result; // сохраняем порядок выполнения
                completedPromises++;

                if (completedPromises === promises.length) {
                    resolve(results);
                }
            }).catch((error) => {
                reject(error);
            });
        }
    });
}

const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
// const p3 = Promise.reject('error');
const p4 = Promise.resolve(4);

promiseAll([3,2,1]).then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
});