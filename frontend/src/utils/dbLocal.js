const dbLocal = (action = 'clear', key = '', data = {}) => {

    switch (action) {
        case 'set':
            localStorage.setItem(key, JSON.stringify(data));
            break;

        case 'get':
            return JSON.parse(localStorage.getItem(key));

        case 'clear':
            localStorage.setItem(key, JSON.stringify({}));
            break;

        default:
            localStorage.setItem(key, JSON.stringify({}));
            break;
    }
}

export default dbLocal;