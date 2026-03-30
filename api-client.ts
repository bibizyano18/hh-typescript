/*
Что нужно сделать

Модели — опишите через interface:

todo_ — id, title, completed, priority, createdAt
User — id, name, email
Branded types — создайте типы TodoId и UserId так, чтобы нельзя было случайно передать один вместо другого, хотя оба основаны на number

API-ответ — создайте generic discriminated union ApiResult<T> с двумя вариантами: успех (с данными типа T) и ошибка (с сообщением)

Exhaustiveness — напишите generic-функцию handleResult, которая обрабатывает все варианты ApiResult через switch. При добавлении нового статуса компилятор должен показать ошибку

Приоритеты — создайте массив приоритетов (low, medium, high, critical) с помощью as const и выведите из него тип Priority

Маппинг приоритетов — создайте объект-маппинг приоритетов на цвета. Используйте mapped type, as const или satisfies — на выбор. Забытый приоритет должен вызывать ошибку компиляции

Utility types — создайте:

TodoPreview — только id, title, completed из Todo_
TodoCreate — todo_ без id и createdAt
ReadonlyTodo — все поля Todo_ readonly
Generic-функция:

apiRequest<T>(url: string): ApiResult<T>
Overload — функция getTodos с двумя перегрузками:

getTodos(): ApiResult<TodoPreview[]>
getTodos(id: TodoId): ApiResult<Todo_>
Критерии приёмки

 TodoId нельзя передать туда, где ожидается UserId
 handleResult при новом status в union — ошибка компиляции
 PRIORITY_COLORS — забытый приоритет = ошибка компиляции
 PRIORITIES[0] имеет тип "low", не string
 getTodos() и getTodos(todoId) возвращают разные типы
 */

interface Todo {
    id:number,
    title:string,
    completed:boolean,
    priority: Priority,
    createdAt:number
}
interface User {
    id:number,
    name: string,
    email: string
}
type TodoId = {
    readonly type:"todo",
    id:number
}
type UserId = {
    readonly type:"user",
    id:number
}
type ApiResult<T> = {status: "success", data: T} | {status: "failure", error: string};

function handleResult<T>(result: ApiResult<T>): string {
    switch (result.status) {
        case "success":
            return `Success. ${result.data}.`
        case "failure":
            return `Failed with ${result.error}`
        default:
            return result
    }
}
const priorities = ['low', 'medium', 'high', 'critical'] as const;
type Priority = typeof priorities[number];

const Priorities_Colors  = {
    low: "gray",
    medium: "yellow",
    high: "green",
    critical: "red"
} satisfies Record<Priority, string>

type TodoPreview = Pick<Todo, 'id'|'title'|'completed'>;
type TodoCreate = Omit<Todo, 'id'|'createdAt'>;
type ReadonlyTodo = Readonly<Todo>;

/* в данном случае я не знаю, как правильно реализовать эту функцию, потому что
на ее вход может подаваться любой тип данных, а получаем мы Response, и получается, что нужно
Response преобразовать в T, но это некорректно использовать в этой функции
получается, что нужно сделать функцию-валидатор, которая будет преобразовывать из Response в нужный тип
например из Response в object
*/
function apiRequest<T>(url: string): Promise<ApiResult<T>> {
    return fetch(url)
        .then(async response => {
            const data : ApiResult<T> = {
                status: "success",
                data: await response.json(),
            };
            return data;

    }).catch(
        (reason: string)=> {
            return {status: "failure", error: reason};
        });
}

function getTodos(): ApiResult<TodoPreview[]>
function getTodos(id: TodoId): ApiResult<Todo>

function getTodos(id? : TodoId): ApiResult<TodoPreview[] | Todo> {
    if (id === undefined) {
        return { status: "success", data:
                [
                    { id: 1, title: "Todo 1", completed: false},
                    { id: 2, title: "Todo 2", completed: true }
                ]
        }
    }
    if (id.type === "todo") {
        return { status: "success", data:
                { id: id.id,
                    title:"Todo 1 with priority",
                    completed: true,
                    priority: 'high',
                    createdAt: 22.03
                }
        }
    }
    return {status: "failure", error: "waited TodoId"}

}
const t : TodoId = {
    type: "todo",
    id: 123
}
const u : UserId = {
    type: "user",
    id: 12
}
console.log(getTodos(t));
apiRequest<object>('https://jsonplaceholder.typicode.com/posts/1').then(value => {
    if (value.status === "success")
        console.log(value.data);
});