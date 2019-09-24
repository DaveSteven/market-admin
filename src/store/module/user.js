import {login, getUserInfo} from '@/api/user'
import {setToken, getToken} from '@/libs/util'

export default {
    state: {
        userName: '',
        userId: '',
        avatarImgPath: '',
        token: getToken(),
        access: '',
        hasGetInfo: false
    },
    mutations: {
        setAvatar(state, avatarPath) {
            state.avatarImgPath = avatarPath
        },
        setUserId(state, id) {
            state.userId = id
        },
        setUserName(state, name) {
            state.userName = name
        },
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setHasGetInfo(state, status) {
            state.hasGetInfo = status
        }
    },
    actions: {
        // 登录
        handleLogin({commit}, {username, password}) {
            username = username.trim()
            return new Promise((resolve, reject) => {
                login({
                    username,
                    password
                }).then(res => {
                    const data = res.data
                    commit('setToken', data.token)
                    commit('setUserName', data.name)
                    commit('setUserId', data.id)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut({commit}) {
            return new Promise((resolve, reject) => {
                // logout(state.token).then(() => {
                //   commit('setToken', '')
                //   resolve()
                // }).catch(err => {
                //   reject(err)
                // })
                // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
                commit('setToken', '')
                // commit('setAccess', [])
                resolve()
            })
        },
        // 获取用户相关信息
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                try {
                    getUserInfo(state.token).then(res => {
                        const data = res.data
                        commit('setAvatar', '')
                        commit('setUserName', data.name)
                        commit('setUserId', data.id)
                        commit('setHasGetInfo', true)
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    })
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}
