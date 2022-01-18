

export const generateRandomNumber = () => {
    return  Math.floor((Math.random() * 500) + 1);
};

export const randomStr = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const isObjectEmpty = (obj = {}) => !obj || Object.keys(obj).length === 0;

export const selectRandomAvatar = () => {
    const avatarArr = [
            'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp',
            'https://mdbcdn.b-cdn.net/img/new/avatars/1.webp',
            'https://mdbcdn.b-cdn.net/img/new/avatars/8.webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp',
            'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp',
    ];
    const num = Math.floor((Math.random() * 4));
    return avatarArr[num];
};


/**
 *
 * @param {*} date
 * @returns
 */
 export const formatDateTimeToString = (date: any) => {
    if (date === '') return '';
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = ('00' + d.getHours()).slice(-2),
        minutes = ('00' + d.getMinutes()).slice(-2);
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${[day, month].join('/')} ${hours}:${minutes}`;
};

/**
 *
 */
 export const scrollBottom = () => {
    window.scrollTo({
        top: 100,
        behavior: 'smooth',
    });
};

