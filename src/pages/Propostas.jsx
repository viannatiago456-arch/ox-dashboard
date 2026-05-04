import React, { useState } from 'react';
import { Plus, Search, Filter, Phone, Mail, Calendar, Clock, Eye, Edit, MessageCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Table from '../components/ui/Table';

const Propostas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');

  const propostas = [
    {
      id: 1,
      cliente: 'Tech Solutions',
      servico: 'Tráfego Pago',
      valor: 15000,
      dataEnvio: '2024-04-15',
      status: 'enviada',
      ultimoFollowup: '2024-04-20',
      diasSemFollowup: 2
    },
    {
      id: 2,
      cliente: 'Digital Agency',
      servico: 'Social Media',
      valor: 8000,
      dataEnvio: '2024-04-10',
      status: 'em_negociacao',
      ultimoFollowup: '2024-04-18',
      diasSemFollowup: 4
    },
    {
      id: 3,
      cliente: 'Startup XYZ',
      servico: 'Site',
      valor: 12000,
      dataEnvio: '2024-04-05',
      status: 'aprovada',
      ultimoFollowup: '2024-04-12',
      diasSemFollowup: 10
    },
    {
      id: 4,
      cliente: 'E-commerce Plus',
      servico: 'Automação',
      valor: 20000,
      dataEnvio: '2024-03-25',
      status: 'enviada',
      ultimoFollowup: '2024-03-28',
      diasSemFollowup: 25
    },
    {
      id: 5,
      cliente: 'Marketing Pro',
      servico: 'Tráfego Pago + Social Media',
      valor: 18000,
      dataEnvio: '2024-04-18',
      status: 'sem_resposta',
      ultimoFollowup: null,
      diasSemFollowup: 4
    },
    {
      id: 6,
      cliente: 'Business Corp',
      servico: 'IA',
      valor: 25000,
      dataEnvio: '2024-04-01',
      status: 'recusada',
      ultimoFollowup: '2024-04-08',
      diasSemFollowup: 14
    }
  ];

  const filteredPropostas = propostas.filter(proposta => {
    const matchesSearch = proposta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposta.servico.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || proposta.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Métricas de resumo
  const propostasAbertas = filteredPropostas.filter(p => ['enviada', 'em_negociacao', 'sem_resposta'].includes(p.status));
  const valorTotalPropostas = filteredPropostas.reduce((total, proposta) => total + proposta.valor, 0);
  const propostasAprovadas = filteredPropostas.filter(p => p.status === 'aprovada');
  const taxaAprovacao = filteredPropostas.length > 0 ? (propostasAprovadas.length / filteredPropostas.length) * 100 : 0;
  const propostasVencidas = filteredPropostas.filter(p => p.diasSemFollowup > 7 && ['enviada', 'sem_resposta'].includes(p.status));

  const getStatusColor = (status) => {
    switch (status) {
      case 'enviada': return 'primary';
      case 'em_negociacao': return 'warning';
      case 'aprovada': return 'success';
      case 'recusada': return 'error';
      case 'sem_resposta': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'enviada': return 'Enviada';
      case 'em_negociacao': return 'Em Negociação';
      case 'aprovada': return 'Aprovada';
      case 'recusada': return 'Recusada';
      case 'sem_resposta': return 'Sem Resposta';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getFollowupWarning = (dias) => {
    if (dias > 7) return 'text-error';
    if (dias > 3) return 'text-warning';
    return 'text-success';
  };

  const tableHeaders = [
    { key: 'cliente', label: 'Cliente' },
    { key: 'servico', label: 'Serviço' },
    { 
      key: 'valor', 
      label: 'Valor',
      render: (valor) => formatCurrency(valor)
    },
    { 
      key: 'dataEnvio', 
      label: 'Data de Envio',
      render: (dataEnvio) => formatDate(dataEnvio)
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (status) => (
        <Badge variant={getStatusColor(status)}>
          {getStatusLabel(status)}
        </Badge>
      )
    },
    { 
      key: 'ultimoFollowup', 
      label: 'Último Follow-up',
      render: (_, proposta) => (
        <div className="space-y-1">
          <div className="text-sm text-text-primary">
            {formatDate(proposta.ultimoFollowup)}
          </div>
          {proposta.ultimoFollowup && (
            <div className={`text-xs ${getFollowupWarning(proposta.diasSemFollowup)}`}>
              {proposta.diasSemFollowup} dias atrás
            </div>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (_, proposta) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-4 h-4" />
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
          <h1 className="text-2xl font-bold text-text-primary">Propostas e Follow-up</h1>
          <p className="text-text-secondary mt-1">
            Gerencie propostas comerciais e acompanhe os follow-ups
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Novo Follow-up
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Proposta
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Propostas Abertas</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{propostasAbertas.length}</p>
              <p className="text-xs text-success mt-2">+3 novas esta semana</p>
            </div>
            <div className="w-12 h-12 bg-brand-primary bg-opacity-20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-brand-primary" />
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Valor Total</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{formatCurrency(valorTotalPropostas)}</p>
              <p className="text-xs text-success mt-2">+18% vs mês anterior</p>
            </div>
            <div className="w-12 h-12 bg-success bg-opacity-20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Taxa de Aprovação</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{taxaAprovacao.toFixed(1)}%</p>
              <p className="text-xs text-success mt-2">+5% vs mês anterior</p>
            </div>
            <div className="w-12 h-12 bg-brand-secondary bg-opacity-20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-brand-secondary" />
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Propostas Vencidas</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{propostasVencidas.length}</p>
              <p className="text-xs text-error mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Sem follow-up há 7+ dias
              </p>
            </div>
            <div className="w-12 h-12 bg-error bg-opacity-20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-error" />
            </div>
          </div>
        </Card>
      </div>

      {/* Alerta de Propostas Vencidas */}
      {propostasVencidas.length > 0 && (
        <Card className="p-4 border-l-4 border-l-error">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error bg-opacity-20 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-error" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary">Atenção: Propostas Vencidas</h3>
              <p className="text-sm text-text-secondary mt-1">
                Você tem {propostasVencidas.length} proposta(s) sem follow-up há mais de 7 dias. 
                É recomendável entrar em contato com esses clientes.
              </p>
            </div>
            <Button variant="error" size="sm">
              Ver Propostas
            </Button>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar propostas..."
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
              <option value="todos">Todos Status</option>
              <option value="enviada">Enviadas</option>
              <option value="em_negociacao">Em Negociação</option>
              <option value="aprovada">Aprovadas</option>
              <option value="recusada">Recusadas</option>
              <option value="sem_resposta">Sem Resposta</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Table
        headers={tableHeaders}
        data={filteredPropostas}
        emptyMessage="Nenhuma proposta encontrada"
      />
    </div>
  );
};

export default Propostas;
