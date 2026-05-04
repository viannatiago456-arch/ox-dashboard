import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const clienteService = {
  // Buscar todos os clientes
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clientes`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  },

  // Buscar cliente por ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/clientes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      throw error;
    }
  },

  // Criar novo cliente
  create: async (clienteData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/clientes`, clienteData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }
  },

  // Atualizar cliente
  update: async (id, clienteData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/clientes/${id}`, clienteData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  },

  // Excluir cliente
  delete: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/clientes/${id}`);
      return true;
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      throw error;
    }
  }
};

export default clienteService;
