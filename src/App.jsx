import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Pipeline from './pages/Pipeline';
import Clientes from './pages/Clientes';
import Campanhas from './pages/Campanhas';
import Propostas from './pages/Propostas';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/campanhas" element={<Campanhas />} />
        <Route path="/propostas" element={<Propostas />} />
      </Routes>
    </Layout>
  );
}

export default App;