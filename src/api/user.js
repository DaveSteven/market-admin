import axios from '@/libs/api.request'

export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: '/user/admin/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/user/getInfo',
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const addUser = ({ username, password, role, name }) => {
  const data = { username, password, role, name }
  return axios.request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export const getUserList = () => {
  return axios.request({
    url: '/user/getList',
    method: 'post'
  })
}
