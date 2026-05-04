import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Pipeline = () => {
  const [cards, setCards] = useState([
    // Prospecção
    { id: 1, nome: 'João Silva', empresa: 'Tech Solutions', valor: 5000, responsavel: 'Maria', prioridade: 'alta', coluna: 'prospeccao' },
    { id: 2, nome: 'Ana Costa', empresa: 'E-commerce Plus', valor: 12000, responsavel: 'João', prioridade: 'media', coluna: 'prospeccao' },
    
    // Contato Feito
    { id: 3, nome: 'Pedro Oliveira', empresa: 'Startup XYZ', valor: 3000, responsavel: 'Maria', prioridade: 'baixa', coluna: 'contato_feito' },
    
    // Proposta Enviada
    { id: 4, nome: 'Carlos Ferreira', empresa: 'Marketing Pro', valor: 6000, responsavel: 'João', prioridade: 'alta', coluna: 'proposta_enviada' },
    { id: 5, nome: 'Mariana Santos', empresa: 'Digital Agency', valor: 8000, responsivel: 'Maria', prioridade: 'media', coluna: 'proposta_enviada' },
    
    // Negociação
    { id: 6, nome: 'Lucas Mendes', empresa: 'Tech Innovations', valor: 15000, responsavel: 'João', prioridade: 'alta', coluna: 'negociacao' },
    
    // Fechado
    { id: 7, nome: 'Fernanda Lima', empresa: 'Business Corp', valor: 10000, responsavel: 'Maria', prioridade: 'media', coluna: 'fechado' },
    
    // Perdido
    { id: 8, nome: 'Ricardo Alves', empresa: 'Startup Alpha', valor: 4000, responsavel: 'João', prioridade: 'baixa', coluna: 'perdido' }
  ]);

  const columns = [
    { id: 'prospeccao', title: 'Prospecção', color: '#6C63FF' },
    { id: 'contato_feito', title: 'Contato Feito', color: '#F59E0B' },
    { id: 'proposta_enviada', title: 'Proposta Enviada', color: '#00D4AA' },
    { id: 'negociacao', title: 'Negociação', color: '#EF4444' },
    { id: 'fechado', title: 'Fechado', color: '#10B981' },
    { id: 'perdido', title: 'Perdido', color: '#9CA3AF' }
  ];

  const getCardsByColumn = (columnId) => {
    return cards.filter(card => card.coluna === columnId);
  };

  const getColumnTotal = (columnId) => {
    return getCardsByColumn(columnId).reduce((total, card) => total + card.valor, 0);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return 'bg-error bg-opacity-20 text-error';
      case 'media': return 'bg-warning bg-opacity-20 text-warning';
      case 'baixa': return 'bg-success bg-opacity-20 text-success';
      default: return 'bg-text-secondary bg-opacity-20 text-text-secondary';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Pipeline de Vendas</h1>
          <p className="text-text-secondary mt-1">Gerencie o funil de vendas da sua agência</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Lead
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        {columns.map((column) => {
          const columnCards = getCardsByColumn(column.id);
          const columnTotal = getColumnTotal(column.id);
          
          return (
            <div key={column.id} className="bg-bg-card rounded-xl p-4">
              {/* Column Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-text-primary text-sm">{column.title}</h3>
                  <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: column.color }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{columnCards.length} cards</span>
                  <span>{formatCurrency(columnTotal)}</span>
                </div>
              </div>

              {/* Cards */}
              <div className="space-y-3 min-h-[200px]">
                {columnCards.map((card) => (
                  <Card key={card.id} className="p-3 cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-text-primary text-sm">{card.nome}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(card.prioridade)}`}>
                          {card.prioridade}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary">{card.empresa}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-brand-primary">
                          {formatCurrency(card.valor)}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-6 h-6 bg-brand-secondary rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              responsavel?.charAt(0) || '?
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pipeline;
