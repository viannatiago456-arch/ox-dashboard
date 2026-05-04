import { useState, useEffect } from 'react';

// Dados mockados para estabilidade
const mockClientes = [
  {
    id: 1,
    nome: 'João Silva',
    empresa: 'Tech Solutions',
    whatsapp: '+55 11 98765-4321',
    email: 'joao@techsolutions.com',
    status: 'ativo',
    servicos: ['Tráfego Pago', 'Social Media'],
    dataInicio: '2024-01-15'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    empresa: 'Digital Agency',
    whatsapp: '+55 11 98765-4322',
    email: 'maria@digitalagency.com',
    status: 'ativo',
    servicos: ['Site', 'Automação'],
    dataInicio: '2024-02-20'
  },
  {
    id: 3,
    nome: 'Pedro Oliveira',
    empresa: 'Startup XYZ',
    whatsapp: '+55 11 98765-4323',
    email: 'pedro@startupxyz.com',
    status: 'inativo',
    servicos: ['Tráfego Pago'],
    dataInicio: '2023-12-10'
  },
  {
    id: 4,
    nome: 'Ana Costa',
    empresa: 'E-commerce Plus',
    whatsapp: '+55 11 98765-4324',
    email: 'ana@ecommerceplus.com',
    status: 'ativo',
    servicos: ['Social Media', 'Email Marketing'],
    dataInicio: '2024-03-05'
  },
  {
    id: 5,
    nome: 'Carlos Ferreira',
    empresa: 'Marketing Pro',
    whatsapp: '+55 11 98765-4325',
    email: 'carlos@marketingpro.com',
    status: 'ativo',
    servicos: ['Tráfego Pago', 'Site', 'Social Media'],
    dataInicio: '2024-01-28'
  }
];

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Inicializar com dados mockados
  useEffect(() => {
    setClientes(mockClientes);
  }, []);

  // Simular criação de cliente
  const createCliente = async (clienteData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCliente = {
        id: Date.now(),
        ...clienteData,
        dataInicio: new Date().toISOString().split('T')[0]
      };
      
      setClientes(prev => [...prev, newCliente]);
      return newCliente;
    } catch (err) {
      setError(err.message || 'Erro ao criar cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Simular atualização de cliente
  const updateCliente = async (id, clienteData) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedCliente = { id, ...clienteData };
      setClientes(prev => 
        prev.map(cliente => 
          cliente.id === id ? updatedCliente : cliente
        )
      );
      return updatedCliente;
    } catch (err) {
      setError(err.message || 'Erro ao atualizar cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Simular exclusão de cliente
  const deleteCliente = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setClientes(prev => prev.filter(cliente => cliente.id !== id));
      return true;
    } catch (err) {
      setError(err.message || 'Erro ao excluir cliente');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    clientes,
    loading,
    error,
    createCliente,
    updateCliente,
    deleteCliente
  };
};
