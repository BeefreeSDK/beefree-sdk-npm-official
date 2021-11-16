import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({    
  headers: { 'content-type': 'application/json', },
})

export default instance
