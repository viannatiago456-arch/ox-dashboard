import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  BarChart2,
  FileText,
  TrendingUp
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Visão Geral',
      icon: LayoutDashboard,
      path: '/'
    },
    {
      id: 'pipeline',
      label: 'Pipeline',
      icon: KanbanSquare,
      path: '/pipeline'
    },
    {
      id: 'clientes',
      label: 'Clientes',
      icon: Users,
      path: '/clientes'
    },
    {
      id: 'campanhas',
      label: 'Campanhas',
      icon: BarChart2,
      path: '/campanhas'
    },
    {
      id: 'propostas',
      label: 'Propostas',
      icon: FileText,
      path: '/propostas'
    }
  ];

  return (
    <div className="w-60 bg-bg-sidebar h-screen flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border-default">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-text-primary">Ox Dashboard</h1>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-border-default">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">João Silva</p>
              <p className="text-xs text-text-secondary">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
