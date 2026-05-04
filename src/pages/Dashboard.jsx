import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  BarChart3,
  PieChart,
  Phone,
  UserPlus
} from 'lucide-react';
import Card from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalClientesAtivos: 0,
    totalPropostasAbertas: 0,
    valorTotalNegociacao: 0,
    totalInvestidoMes: 0
  });

  // Dados fictícios para os gráficos
  const leadsData = [
    { month: 'Jan', leads: 45 },
    { month: 'Fev', leads: 52 },
    { month: 'Mar', leads: 38 },
    { month: 'Abr', leads: 65 },
    { month: 'Mai', leads: 48 },
    { month: 'Jun', leads: 58 }
  ];

  const propostasStatusData = [
    { name: 'Enviada', value: 12, color: '#6C63FF' },
    { name: 'Em Negociação', value: 8, color: '#F59E0B' },
    { name: 'Aprovada', value: 15, color: '#10B981' },
    { name: 'Recusada', value: 3, color: '#EF4444' }
  ];

  const followupsRecentes = [
    { id: 1, cliente: 'Tech Solutions', resultado: 'Interessado', data: '22/04/2026' },
    { id: 2, cliente: 'Digital Agency', resultado: 'Pediu mais info', data: '22/04/2026' },
    { id: 3, cliente: 'Startup XYZ', resultado: 'Aprovado', data: '21/04/2026' },
    { id: 4, cliente: 'E-commerce Plus', resultado: 'Sem resposta', data: '21/04/2026' },
    { id: 5, cliente: 'Marketing Pro', resultado: 'Recusado', data: '20/04/2026' }
  ];

  const leadsRecentes = [
    { id: 1, nome: 'João Silva', empresa: 'Tech Solutions', valor: 'R$ 5.000', coluna: 'proposta_enviada' },
    { id: 2, nome: 'Maria Santos', empresa: 'Digital Agency', valor: 'R$ 8.000', coluna: 'negociacao' },
    { id: 3, nome: 'Pedro Oliveira', empresa: 'Startup XYZ', valor: 'R$ 3.000', coluna: 'contato_feito' },
    { id: 4, nome: 'Ana Costa', empresa: 'E-commerce Plus', valor: 'R$ 12.000', coluna: 'prospeccao' },
    { id: 5, nome: 'Carlos Ferreira', empresa: 'Marketing Pro', valor: 'R$ 6.000', coluna: 'proposta_enviada' }
  ];

  useEffect(() => {
    // Simular busca de dados da API
    setMetrics({
      totalClientesAtivos: 24,
      totalPropostasAbertas: 38,
      valorTotalNegociacao: 156000,
      totalInvestidoMes: 45000
    });
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Clientes Ativos</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{metrics.totalClientesAtivos}</p>
              <p className="text-xs text-success mt-2">+12% vs mês anterior</p>
            </div>
            <div className="w-12 h-12 bg-brand-primary bg-opacity-20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-brand-primary" />
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Propostas Abertas</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{metrics.totalPropostasAbertas}</p>
              <p className="text-xs text-success mt-2">+8% vs mês anterior</p>
            </div>
            <div className="w-12 h-12 bg-brand-secondary bg-opacity-20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-brand-secondary" />
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Valor em Negociação</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{formatCurrency(metrics.valorTotalNegociacao)}</p>
              <p className="text-xs text-success mt-2">+25% vs mês anterior</p>
            </div>
            <div className="w-12 h-12 bg-success bg-opacity-20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">Investido no Mês</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{formatCurrency(metrics.totalInvestidoMes)}</p>
              <p className="text-xs text-error mt-2">-5% vs mês anterior</p>
            </div>
            <div className="w-12 h-12 bg-warning bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Leads Gerados por Mês</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A2E', 
                    border: '1px solid #2A2A3E',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="leads" fill="#00D4AA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Distribuição de Propostas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={propostasStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {propostasStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A2E', 
                    border: '1px solid #2A2A3E',
                    borderRadius: '8px'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Listas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Últimos Follow-ups</h3>
            <div className="space-y-3">
              {followupsRecentes.map((followup) => (
                <div key={followup.id} className="flex items-center justify-between p-3 bg-bg-primary rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-primary bg-opacity-20 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{followup.cliente}</p>
                      <p className="text-xs text-text-secondary">{followup.data}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    followup.resultado === 'Aprovado' ? 'bg-success bg-opacity-20 text-success' :
                    followup.resultado === 'Interessado' ? 'bg-brand-primary bg-opacity-20 text-brand-primary' :
                    followup.resultado === 'Recusado' ? 'bg-error bg-opacity-20 text-error' :
                    'bg-warning bg-opacity-20 text-warning'
                  }`}>
                    {followup.resultado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Leads Recentes</h3>
            <div className="space-y-3">
              {leadsRecentes.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-bg-primary rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-secondary bg-opacity-20 rounded-full flex items-center justify-center">
                      <UserPlus className="w-4 h-4 text-brand-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{lead.nome}</p>
                      <p className="text-xs text-text-secondary">{lead.empresa}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary">{lead.valor}</p>
                    <p className="text-xs text-text-secondary capitalize">{lead.coluna.replace('_', ' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
