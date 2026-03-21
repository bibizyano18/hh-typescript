interface ITypedObject {
    name: string;
    age: number;
}

const user: ITypedObject = {
    name: "Vanya",
    age: 12,
};

user.name = "Ivan"; // выполнится
console.log(user.name); // "Ivan"

user.name = "20";      // выполнится
console.log(user.name); // 20

// user.age = "20";    // должно выбросить ошибку