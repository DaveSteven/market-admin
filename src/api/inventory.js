import axios from '@/libs/api.request'

/**
 * 商品入库
 * @param goodsId
 * @param channelId
 * @param amount
 * @param price
 * @returns {ClientRequest | ClientHttp2Stream | never | *}
 */
export const addInventory = ({ goodsId, channelId, amount, price }) => {
    const data = { goodsId, channelId, amount, price }

    return axios.request({
        url: '/inventory/add',
        method: 'post',
        data
    })
}

/**
 * 获取库存
 * @param start
 * @param limit
 * @returns {ClientRequest | ClientHttp2Stream | never | *}
 */
export const getInventoryList = ({ start = 0, limit = 0 }) => {
    const data = {
        start, limit
    }

    return axios.request({
        url: '/inventory/getList',
        method: 'post',
        data
    })
}

/**
 * 获取入库单汇总
 * @param start
 * @param limit
 * @returns {ClientRequest | * | never | Promise<AxiosResponse<T>> | ClientHttp2Stream}
 */
export const getInventoryCollect = ({ start = 0, limit = 0 }) => {
    const data = {
        start, limit
    }

    return axios.request({
        url: '/inventory/getCollect',
        method: 'post',
        data
    })
}
