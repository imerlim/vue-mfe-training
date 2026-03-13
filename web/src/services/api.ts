import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000' // URL do seu NestJS
})

// Interceptor de REQUISIÇÃO: roda antes da chamada sair do Vue
api.interceptors.request.use((config) => {
    // Por enquanto apenas logamos, mas aqui entrará o JWT depois
    console.log(`🚀 Fazendo chamada para: ${config.url}`)
    return config
})

// Interceptor de RESPOSTA: roda quando o NestJS responde
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Se o NestJS retornar erro de validação (400), podemos tratar aqui
        if (error.response?.status === 400) {
            console.error('Erro de validação:', error.response.data.message)
        }
        return Promise.reject(error)
    }
)

export default api
