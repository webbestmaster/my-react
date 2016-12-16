/*eslint-disable */
export const ping = store => next => action => {
    console.log(`Тип события: ${action.type}, дополнительные данные события: ${action.payload}`);
    return next(action)
}

// ES5 version
var pong = function pong(store) {
    return function (next) {
        return function (action) {
            console.log('ping');
            return next(action);
        };
    };
};

/*eslint-enable */
