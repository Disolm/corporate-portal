import users from './api/users.js';

/**
 * Получение данных user ID с API
 * @param {String} idOrName
 * @param {Number} wait
 * @return {Promise<Object[]>} - Массив данных юзеров
 * @throws {Error} - Ошибка получения массива данных юзеров
 */
export async function fetchUserByIdAndName(idOrName, wait) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            let user = []
            if (+idOrName) {
                const obj = users.find((user) => {
                    return user.id === +idOrName
                })
                if (obj) user.push(obj)
            } else if (!!idOrName) {
                const flag = 'gi'
                const searchStrShielding = idOrName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
                const regexp = new RegExp(searchStrShielding, flag)
                user = users.filter((user) => {
                    regexp.lastIndex = 0
                    return regexp.test(user.name)
                })
            }
            if (!user.length) {
                reject(new Error('Not found'));
            }
            resolve(user);
        }, wait);
    });
}