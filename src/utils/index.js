import dayjs from "dayjs";
import zh_CN from "dayjs/locale/zh-cn";
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
dayjs.locale(zh_CN);

export const formNow = (date) => {
    return dayjs(date).fromNow();
}

export const format = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
}

export const validateEmail = str => /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str);
