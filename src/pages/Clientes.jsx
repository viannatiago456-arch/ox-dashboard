import React, { useState } from 'react';
import { Plus, Search, Filter, Grid, List, Phone, Mail, Edit, Eye, Trash2, UserPlus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Table from '../components/ui/Table';
import ClienteForm from '../components/forms/ClienteForm';
import { useClientes } from '../hooks/useClientes';

const Clientes = () => {
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);

  const { 
    clientes, 
    loading, 
    error, 
    createCliente, 
    updateCliente, 
    deleteCliente 
  } = useClientes();

  // Dados mockados para fallback (caso API não funcione)
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
      servicos: ['Social Media', 'IA'],
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

  // Usar dados mockados (estáveis)
  const clientesData = clientes;

  const filteredClientes = clientesData.filter(cliente => {
    const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || cliente.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handlers para CRUD
  const handleAddCliente = () => {
    setEditingCliente(null);
    setShowModal(true);
  };

  const handleEditCliente = (cliente) => {
    setEditingCliente(cliente);
    setShowModal(true);
  };

  const handleDeleteCliente = async (cliente) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente "${cliente.nome}"?`)) {
      try {
        await deleteCliente(cliente.id);
        // Sucesso já tratado no hook
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingCliente) {
        await updateCliente(editingCliente.id, formData);
      } else {
        await createCliente(formData);
      }
      setShowModal(false);
      setEditingCliente(null);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const getStatusColor = (status) => {
    return status === 'ativo' ? 'success' : 'secondary';
  };

  const getAvatarColor = (name) => {
    const colors = ['bg-brand-primary', 'bg-brand-secondary', 'bg-success', 'bg-warning', 'bg-error'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const tableHeaders = [
    { key: 'nome', label: 'Nome' },
    { key: 'empresa', label: 'Empresa' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'email', label: 'E-mail' },
    { 
      key: 'status', 
      label: 'Status',
      render: (status) => (
        <Badge variant={getStatusColor(status)}>
          {status === 'ativo' ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    },
    { 
      key: 'servicos', 
      label: 'Serviços',
      render: (servicos) => (
        <div className="flex flex-wrap gap-1">
          {servicos.map((servico, index) => (
            <Badge key={index} variant="secondary" size="sm">
              {servico}
            </Badge>
          ))}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (_, cliente) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleEditCliente(cliente)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDeleteCliente(cliente)}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Gestão de Clientes</h1>
          <p className="text-text-secondary mt-1">
            Gerencie seus clientes e suas informações
          </p>
        </div>
        <Button variant="primary" className="flex items-center gap-2" onClick={handleAddCliente}>
          <UserPlus className="w-4 h-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome ou empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option value="todos">Todos</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-bg-primary rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Content */}
      {viewMode === 'table' ? (
        <Table
          headers={tableHeaders}
          data={filteredClientes}
          emptyMessage="Nenhum cliente encontrado"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClientes.map((cliente) => (
            <Card key={cliente.id} className="p-6">
              <div className="space-y-4">
                {/* Avatar e Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${getAvatarColor(cliente.nome)} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-semibold">
                      {cliente.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary">{cliente.nome}</h3>
                    <p className="text-sm text-text-secondary">{cliente.empresa}</p>
                  </div>
                  <Badge variant={getStatusColor(cliente.status)}>
                    {cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>

                {/* Contato */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Phone className="w-4 h-4" />
                    {cliente.whatsapp}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Mail className="w-4 h-4" />
                    {cliente.email}
                  </div>
                </div>

                {/* Serviços */}
                <div>
                  <p className="text-xs font-medium text-text-secondary mb-2">Serviços Contratados</p>
                  <div className="flex flex-wrap gap-1">
                    {cliente.servicos.map((servico, index) => (
                      <Badge key={index} variant="secondary" size="sm">
                        {servico}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-2 pt-2 border-t border-border-default">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleEditCliente(cliente)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleDeleteCliente(cliente)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Excluir
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Formulário */}
      <ClienteForm
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingCliente(null);
        }}
        onSubmit={handleFormSubmit}
        cliente={editingCliente}
        isLoading={loading}
      />
    </div>
  );
};

export default Clientes;
