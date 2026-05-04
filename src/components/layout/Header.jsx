import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'Visão Geral';
      case '/pipeline':
        return 'Pipeline de Vendas';
      case '/clientes':
        return 'Gestão de Clientes';
      case '/campanhas':
        return 'Métricas de Campanhas';
      case '/propostas':
        return 'Propostas e Follow-up';
      default:
        return 'Ox Dashboard';
    }
  };

  return (
    <header className="h-16 bg-bg-card border-b border-border-default fixed top-0 right-0 left-60 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{getPageTitle()}</h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-text-secondary absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 bg-bg-primary border border-border-default rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>

          {/* User Avatar */}
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-bg-card transition-colors">
            <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
