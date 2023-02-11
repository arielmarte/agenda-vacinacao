import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080/'
  //baseURL: 'http://vacinacao.sytes.net:8080/'
  //baseURL: 'http://192.168.0.22:8080'
  //baseURL: 'http://localhost:3000/api'
})