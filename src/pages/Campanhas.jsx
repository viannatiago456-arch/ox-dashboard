import React, { useState } from 'react';
import { Plus, Search, Filter, TrendingUp, TrendingDown, Eye, Edit, Pause, Play } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Table from '../components/ui/Table';

const Campanhas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [plataformaFilter, setPlataformaFilter] = useState('todas');
  const [clienteFilter, setClienteFilter] = useState('todos');
  const [statusFilter, setStatusFilter] = useState('todos');

  const campanhas = [
    {
      id: 1,
      nome: 'Black Friday Tech',
      cliente: 'Tech Solutions',
      plataforma: 'meta_ads',
      investimento: 15000,
      leads: 245,
      ctr: 3.2,
      status: 'ativa',
      dataInicio: '2024-04-01',
      dataFim: '2024-04-30'
    },
    {
      id: 2,
      nome: 'Google Ads Launch',
      cliente: 'Digital Agency',
      plataforma: 'google_ads',
      investimento: 12000,
      leads: 189,
      ctr: 2.8,
      status: 'ativa',
      dataInicio: '2024-03-15',
      dataFim: '2024-04-15'
    },
    {
      id: 3,
      nome: 'TikTok Challenge',
      cliente: 'Startup XYZ',
      plataforma: 'tiktok_ads',
      investimento: 8000,
      leads: 156,
      ctr: 4.1,
      status: 'pausada',
      dataInicio: '2024-02-01',
      dataFim: '2024-03-01'
    },
    {
      id: 4,
      nome: 'LinkedIn B2B',
      cliente: 'E-commerce Plus',
      plataforma: 'linkedin_ads',
      investimento: 10000,
      leads: 98,
      ctr: 1.9,
      status: 'encerrada',
      dataInicio: '2024-01-15',
      dataFim: '2024-02-15'
    },
    {
      id: 5,
      nome: 'Meta Retargeting',
      cliente: 'Marketing Pro',
      plataforma: 'meta_ads',
      investimento: 18000,
      leads: 312,
      ctr: 3.8,
      status: 'ativa',
      dataInicio: '2024-04-10',
      dataFim: '2024-05-10'
    }
  ];

  const filteredCampanhas = campanhas.filter(campanha => {
    const matchesSearch = campanha.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campanha.cliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlataforma = plataformaFilter === 'todas' || campanha.plataforma === plataformaFilter;
    const matchesCliente = clienteFilter === 'todos' || campanha.cliente === clienteFilter;
    const matchesStatus = statusFilter === 'todos' || campanha.status === statusFilter;
    return matchesSearch && matchesPlataforma && matchesCliente && matchesStatus;
  });

  // Métricas de resumo
  const totalInvestido = filteredCampanhas.reduce((total, campanha) => total + campanha.investimento, 0);
  const totalLeads = filteredCampanhas.reduce((total, campanha) => total + campanha.leads, 0);
  const cplMedio = totalLeads > 0 ? totalInvestido / totalLeads : 0;
  const melhorCampanha = filteredCampanhas.reduce((melhor, campanha) => {
    const cplAtual = campanha.leads > 0 ? campanha.investimento / campanha.leads : Infinity;
    const cplMelhor = melhor.leads > 0 ? melhor.investimento / melhor.leads : Infinity;
    return cplAtual < cplMelhor ? campanha : melhor;
  }, filteredCampanhas[0]);

  const getPlataformaColor = (plataforma) => {
    switch (plataforma) {
      case 'meta_ads': return 'bg-blue-500 bg-opacity-20 text-blue-400';
      case 'google_ads': return 'bg-red-500 bg-opacity-20 text-red-400';
      case 'tiktok_ads': return 'bg-gray-800 bg-opacity-20 text-gray-300';
      case 'linkedin_ads': return 'bg-blue-400 bg-opacity-20 text-blue-300';
      default: return 'bg-text-secondary bg-opacity-20 text-text-secondary';
    }
  };

  const getPlataformaLabel = (plataforma) => {
    switch (plataforma) {
      case 'meta_ads': return 'Meta Ads';
      case 'google_ads': return 'Google Ads';
      case 'tiktok_ads': return 'TikTok Ads';
      case 'linkedin_ads': return 'LinkedIn Ads';
      default: return plataforma;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativa': return 'success';
      case 'pausada': return 'warning';
      case 'encerrada': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ativa': return 'Ativa';
      case 'pausada': return 'Pausada';
      case 'encerrada': return 'Encerrada';
      default: return status;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calculateCPL = (investimento, leads) => {
    return leads > 0 ? formatCurrency(investimento / leads) : 'N/A';
  };

  const tableHeaders = [
    { key: 'nome', label: 'Nome' },
    { 
      key: 'plataforma', 
      label: 'Plataforma',
      render: (plataforma) => (
        <Badge variant="secondary" className={getPlataformaColor(plataforma)}>
          {getPlataformaLabel(plataforma)}
        </Badge>
      )
    },
    { key: 'cliente', label: 'Cliente' },
    { 
      key: 'investimento', 
      label: 'Investimento',
      render: (investimento) => formatCurrency(investimento)
    },
    { key: 'leads', label: 'Leads' },
    { 
      key: 'cpl', 
      label: 'CPL',
      render: (_, campanha) => calculateCPL(campanha.investimento, campanha.leads)
    },
    { 
      key: 'ctr', 
      label: 'CTR',
      render: (ctr) => `${ctr}%`
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
      key: 'actions',
      label: 'Ações',
      render: (_, campanha) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            {campanha.status === 'ativa' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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
          <h1 className="text-2xl font-bold text-text-primary">Métricas de Campanhas</h1>
          <p className="text-text-secondary mt-1">
            Gerencie e acompanhe o desempenho das campanhas de tráfego pago
          </p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nova Campanha
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Total Investido</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{formatCurrency(totalInvestido)}</p>
              <p className="text-xs text-success mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +15% vs mês anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-primary bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-brand-primary" />
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Total de Leads</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{totalLeads.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-success mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +22% vs mês anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-success bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">CPL Médio</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{formatCurrency(cplMedio)}</p>
              <p className="text-xs text-error mt-2 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                -8% vs mês anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-brand-secondary bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-brand-secondary" />
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Melhor Campanha</p>
              <p className="text-lg font-bold text-text-primary mt-2">{melhorCampanha?.nome || 'N/A'}</p>
              <p className="text-xs text-success mt-2">
                CPL: {calculateCPL(melhorCampanha?.investimento || 0, melhorCampanha?.leads || 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar campanhas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <select
              value={plataformaFilter}
              onChange={(e) => setPlataformaFilter(e.target.value)}
              className="input"
            >
              <option value="todas">Todas Plataformas</option>
              <option value="meta_ads">Meta Ads</option>
              <option value="google_ads">Google Ads</option>
              <option value="tiktok_ads">TikTok Ads</option>
              <option value="linkedin_ads">LinkedIn Ads</option>
            </select>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input"
          >
            <option value="todos">Todos Status</option>
            <option value="ativa">Ativas</option>
            <option value="pausada">Pausadas</option>
            <option value="encerrada">Encerradas</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <Table
        headers={tableHeaders}
        data={filteredCampanhas}
        emptyMessage="Nenhuma campanha encontrada"
      />
    </div>
  );
};

export default Campanhas;
