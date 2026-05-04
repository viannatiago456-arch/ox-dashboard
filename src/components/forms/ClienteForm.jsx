import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { securityUtils } from '../../utils/security';

const ClienteForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  cliente = null, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    whatsapp: '',
    email: '',
    status: 'ativo',
    servicos: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cliente) {
      setFormData({
        nome: cliente.nome || '',
        empresa: cliente.empresa || '',
        whatsapp: cliente.whatsapp || '',
        email: cliente.email || '',
        status: cliente.status || 'ativo',
        servicos: cliente.servicos || []
      });
    } else {
      setFormData({
        nome: '',
        empresa: '',
        whatsapp: '',
        email: '',
        status: 'ativo',
        servicos: []
      });
    }
  }, [cliente, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário digita
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleServicoToggle = (servico) => {
    setFormData(prev => ({
      ...prev,
      servicos: prev.servicos.includes(servico)
        ? prev.servicos.filter(s => s !== servico)
        : [...prev.servicos, servico]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Sanitização e validação do nome
    const sanitizedNome = securityUtils.sanitizeInput(formData.nome);
    if (!sanitizedNome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (!securityUtils.validateName(sanitizedNome)) {
      newErrors.nome = 'Nome deve conter apenas letras e espaços';
    }
    
    // Sanitização e validação da empresa
    const sanitizedEmpresa = securityUtils.sanitizeInput(formData.empresa);
    if (!sanitizedEmpresa.trim()) {
      newErrors.empresa = 'Empresa é obrigatória';
    } else if (!securityUtils.validateCompany(sanitizedEmpresa)) {
      newErrors.empresa = 'Nome da empresa inválido';
    }
    
    // Validação do email
    const sanitizedEmail = securityUtils.sanitizeInput(formData.email);
    if (!sanitizedEmail.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!securityUtils.validateEmail(sanitizedEmail)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validação do telefone
    const sanitizedPhone = securityUtils.sanitizeInput(formData.whatsapp);
    if (!sanitizedPhone.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (!securityUtils.validatePhone(sanitizedPhone)) {
      newErrors.whatsapp = 'WhatsApp inválido (use formato: +55 11 98765-4321)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit(formData);
  };

  const servicosOptions = [
    'Tráfego Pago',
    'Social Media', 
    'Site',
    'Automação',
    'IA',
    'Email Marketing'
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={cliente ? 'Editar Cliente' : 'Novo Cliente'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome *"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            error={errors.nome}
            placeholder="Nome completo"
            required
          />
          
          <Input
            label="Empresa *"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            error={errors.empresa}
            placeholder="Nome da empresa"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="email@exemplo.com"
            required
          />
          
          <Input
            label="WhatsApp *"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            error={errors.whatsapp}
            placeholder="+55 11 98765-4321"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input"
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Serviços Contratados
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {servicosOptions.map(servico => (
              <label key={servico} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.servicos.includes(servico)}
                  onChange={() => handleServicoToggle(servico)}
                  className="rounded border-border-default text-brand-primary focus:ring-brand-primary"
                />
                <span className="text-sm text-text-primary">{servico}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-border-default">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando...
              </span>
            ) : (
              cliente ? 'Atualizar' : 'Cadastrar'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ClienteForm;
