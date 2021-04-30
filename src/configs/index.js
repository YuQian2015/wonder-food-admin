const dev = {
    baseUrl: 'http://127.0.0.1:3000'
}

const prod = {
    baseUrl: 'http://127.0.0.1:3000'
}

export const apiConfig = process.env.NODE_ENV === 'production' ? prod : dev;