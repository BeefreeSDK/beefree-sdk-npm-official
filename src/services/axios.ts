import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({  
  headers: { 'Content-Type': 'application/x-www-form-urlencoded', },
})


export default instance