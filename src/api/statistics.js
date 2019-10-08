import axios from '@/libs/api.request'

/**
 * 获取收益情况
 * @param date
 * @returns {ClientRequest | * | never | Promise<AxiosResponse<T>> | ClientHttp2Stream}
 */
export const getIncome = ({ date }) => {
    const data = { date }

    return axios.request({
        url: '/statistics/getIncome',
        method: 'post',
        data
    })
}

/**
 * 获取支出情况
 * @param date
 * @returns {ClientRequest | * | never | Promise<AxiosResponse<T>> | ClientHttp2Stream}
 */
export const getExpend = ({ date }) => {
    const data = { date }

    return axios.request({
        url: '/statistics/getExpend',
        method: 'post',
        data
    })
}

/**
 * 获取商品出售情况
 * @param date
 * @returns {ClientRequest | * | never | Promise<AxiosResponse<T>> | ClientHttp2Stream}
 */
export const getSold = ({ date }) => {
    const data = { date }

    return axios.request({
        url: '/statistics/getSold',
        method: 'post',
        data
    })
}

/**
 * 获取进货情况
 * @param date
 * @returns {*|never|Promise<AxiosResponse<T>>|http.ClientRequest|ClientHttp2Stream}
 */
export const getStock = ({ date }) => {
    const data = { date }

    return axios.request({
        url: '/statistics/getStock',
        method: 'post',
        data
    })
}
