/*Что нужно сделать

Виды уведомлений — создайте discriminated union Notification из трёх типов
(success, error, warning). Дискриминант — поле type. Каждый тип имеет свои уникальные поля:

success: message, duration
error: message, retry (boolean), errorCode
warning: message
Конфиг — создайте объект-маппинг: для каждого типа уведомления — иконка и цвет. Используйте mapped type, as const или satisfies — на выбор

Exhaustiveness — напишите функцию renderNotification, которая обрабатывает все типы уведомлений через switch. При добавлении нового типа в union компилятор должен показать ошибку

Type Guard — напишите функцию-предикат isErrorNotification, которая сужает тип Notification до ErrorNotification
*/
/*Utility types — создайте:

NotificationPreview — только type и message из Notification
NotificationWithoutMeta — ErrorNotification без errorCode
Intersection — создайте тип TrackedNotification, который добавляет к Notification метаданные: id, дата создания, дата прочтения (опциональная)
*/
/*Функции (3 штуки):

renderNotification(n: Notification): string
isErrorNotification(n: Notification): n is ErrorNotification
getUnread(notifications: TrackedNotification[]): TrackedNotification[]
Критерии приёмки

 При добавлении InfoNotification в union — компилятор ругается в renderNotification
 isErrorNotification корректно сужает тип — после проверки доступны retry и errorCode
 NOTIFICATION_CONFIG сохраняет literal types ("#4caf50", не string)
 getUnread возвращает только уведомления без readAt
*/

type Success = {
    readonly type: 'success',
    message: string,
    duration: number
}
type MyError = {
    readonly type: 'error',
    message: string,
    retry: boolean,
    errorCode: string
}
type Warning = { readonly type: 'warning', message: string }
type UnionNotification = Success | MyError | Warning;

const notificationConfig = {
    success : {icon:"success", color:'green'},
    error : {icon:"error", color:'red'},
    warning: {icon:"warning", color:'yellow'}

} satisfies Record<UnionNotification['type'], {icon: string, color: string}>

function renderNotification(notification : UnionNotification) : string {
    switch (notification.type) {
        case "success":
            return `✅  ${notification.message} (${notification.duration}ms)`
        case "error":
            return `❌  ${notification.errorCode} (${notification.message}) Retry: ${notification.retry}`
        case "warning":
            return `⚠️  ${notification.message}`
        default:
            return notification
    }
}
function isErrorNotification(notification : UnionNotification) : notification is MyError {
    return notification.type === 'error';
}
function getUnread(notification : TrackedNotification[]) : TrackedNotification[] {
    if (!Array.isArray(notification))
        return [];
    return notification.filter((x) => x.hasOwnProperty('readAt') === false)
}

type NotificationPreview = Pick<UnionNotification, "type" | "message">;
type NotificationWithoutMeta = Omit<Error, "errorCode">
type TrackedNotification = UnionNotification & {
    id: number
    createdAt: number
    readAt?: number
}

const n1 : TrackedNotification = {
    type: "success",
    message: 'success message',
    duration: 2,
    id: 1,
    createdAt: 21.03
};

const n2 : TrackedNotification = {
    type: "warning",
    message: "warning message",
    id: 2,
    createdAt: 21.03,
    readAt: Date.now()
};
console.log(renderNotification(n1));
console.log(isErrorNotification(n2));
console.log(getUnread([n1,n2]));
