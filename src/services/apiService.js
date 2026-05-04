import axios from 'axios';
import { securityUtils } from '../utils/security';

// Configuração do Axios com interceptors
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Adiciona CSRF token
    const csrfToken = securityUtils.generateCSRFToken();
    config.headers['X-CSRF-Token'] = csrfToken;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Trata diferentes tipos de erro
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token expirado ou inválido
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          // Sem permissão
          window.location.href = '/unauthorized';
          break;
        case 429:
          // Rate limit exceeded
          console.error('Muitas tentativas. Tente novamente mais tarde.');
          break;
        case 500:
          // Erro do servidor
          console.error('Erro interno do servidor');
          break;
      }
    } else if (error.request) {
      // Erro de rede
      console.error('Erro de conexão');
    }
    
    return Promise.reject(error);
  }
);

export default api;
