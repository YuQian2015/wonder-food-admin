import axios from 'axios';
import { Message } from 'element-ui';
import localForage from "localforage";
// https://www.kancloud.cn/yunye/axios/234845

export default class HttpService {
    static addQuery(url, str) {
        return url += /\?/g.test(url) ? `&${str}` : `?${str}`;
    }

    static async getToken() {
        const token = await localForage.getItem('token');
        this.token = `Bearer ${token}`;
        return `Bearer ${this.token}`
    }
    static async post(url, data) {
        await HttpService.getToken();

        // Send a POST request
        const result = await axios({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            data,
            validateStatus: function (status) {
                if (status === 401) {
                    HttpService.invalid();
                }
                return status >= 200 && status < 300; // default
            },
            transformResponse: [function (data) {
                try {
                    const result = JSON.parse(data);
                    if (!result.success && result.code === 500) {
                        Message.error(result.msg);
                    }
                    if (!result.success && result.code === 422) {
                        Message.error(result.msg);
                    }
                    return result;
                }
                catch (e) {
                    console.log(e);
                }
            }],
        });

        if (result && result.status) {
            return result.data
        } else {
            alert('请求出错')
        }

    }

    static async get(url, data) {
        await HttpService.getToken();

        if (data) {
            let query = [];
            for (let key in data) {
                query.push(`${key}=${data[key]}`)
            }
            url = HttpService.addQuery(url, query.join('&'))
        }
        // Send a GET request
        const result = await axios({
            method: 'get',
            url,
            headers: {
                'Authorization': this.token
            },
            data,
            validateStatus: function (status) {
                if (status === 401) {
                    HttpService.invalid();
                }
                return status >= 200 && status < 300; // default
            },
            transformResponse: [function (data) {
                try {
                    const result = JSON.parse(data);
                    if (!result.success && result.code === 500) {
                        Message.error(result.msg);
                    }
                    return result;
                }
                catch (e) {
                    console.log(e);
                }
            }],
        });

        if (result && result.status) {
            return result.data
        } else {
            alert('请求出错')
        }

    }

    static async delete(url, data) {
        await HttpService.getToken();

        if (data) {
            let query = [];
            for (let key in data) {
                query.push(`${key}=${data[key]}`)
            }
            url = HttpService.addQuery(url, query.join('&'))
        }
        // Send a GET request
        const result = await axios({
            method: 'delete',
            url,
            headers: {
                'Authorization': this.token
            },
            data,
            validateStatus: function (status) {
                if (status === 401) {
                    HttpService.invalid();
                }
                return status >= 200 && status < 300; // default
            },
            transformResponse: [function (data) {
                try {
                    const result = JSON.parse(data);
                    if (!result.success && result.code === 500) {
                        Message.error(result.msg);
                    }
                    return result;
                }
                catch (e) {
                    console.log(e);
                }
            }],
        });

        if (result && result.status) {
            return result.data
        } else {
            alert('请求出错')
        }

    }

    static async upload(url, data) {
        await HttpService.getToken();

        // Send a POST request
        const result = await axios({
            method: 'post',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            data,
            validateStatus: function (status) {

                if (status === 401) {
                    HttpService.invalid();
                }
                return status >= 200 && status < 300; // default
            },
            transformRequest: [function (data, headers) {
                // Do whatever you want to transform the data
                headers['Content-Type'] = 'multipart/form-data'
                return data;
            }],
            transformResponse: [function (data) {
                try {
                    const result = JSON.parse(data);
                    if (!result.success && result.code === 500) {
                        Message.error(result.msg);
                    }
                    return result;
                }
                catch (e) {
                    console.log(e);
                }
            }],
        });

        if (result && result.status) {
            return result.data
        } else {
            alert('请求出错')
        }
    }


    static async put(url, data) {
        await HttpService.getToken();

        // Send a POST request
        const result = await axios({
            method: 'put',
            url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            data,
            validateStatus: function (status) {
                if (status === 401) {
                    HttpService.invalid();
                }
                return status >= 200 && status < 300; // default
            },
            transformResponse: [function (data) {
                try {
                    const result = JSON.parse(data);
                    if (!result.success && result.code === 500) {
                        Message.error(result.msg);
                    }
                    return result;
                }
                catch (e) {
                    console.log(e);
                }
            }],
        });

        if (result && result.status) {
            return result.data
        } else {
            alert('请求出错')
        }
    }


    static async invalid() {
        await localForage.clear();
        const event = new Event('token_invalid');
        Message.error('登录失效');
        if (window.dispatchEvent) {
            window.dispatchEvent(event);
        } else {
            window.fireEvent(event);
        }
    }
}