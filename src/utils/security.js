// Utilitários de segurança para o frontend

export const securityUtils = {
  // Validação de email
  validateEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Validação de telefone (formato brasileiro)
  validatePhone: (phone) => {
    const re = /^\+?55?\s?(\d{2})?\s?9?\d{4}-?\d{4}$/;
    return re.test(phone);
  },

  // Sanitização de input para XSS
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '') // Remove tags HTML
      .replace(/javascript:/gi, '') // Remove protocolos javascript
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  },

  // Validação de nome (apenas letras e espaços)
  validateName: (name) => {
    const re = /^[a-zA-ZÀ-ÿ\s]+$/;
    return re.test(name.trim());
  },

  // Validação de empresa (permite caracteres especiais comuns)
  validateCompany: (company) => {
    const re = /^[a-zA-Z0-9À-ÿ\s&.-]+$/;
    return re.test(company.trim());
  },

  // Gera um token CSRF simples (em produção use biblioteca dedicada)
  generateCSRFToken: () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  },

  // Verifica se o usuário tem permissão (simulado)
  hasPermission: (userRole, requiredRole) => {
    const roles = {
      'admin': 3,
      'manager': 2,
      'user': 1
    };
    
    return roles[userRole] >= roles[requiredRole];
  },

  // Rate limiting simples
  rateLimiter: {
    attempts: {},
    
    checkLimit: (key, maxAttempts = 5, windowMs = 60000) => {
      const now = Date.now();
      const attempts = securityUtils.rateLimiter.attempts[key] || [];
      
      // Remove tentativas antigas
      const validAttempts = attempts.filter(time => now - time < windowMs);
      
      if (validAttempts.length >= maxAttempts) {
        return false;
      }
      
      // Adiciona tentativa atual
      validAttempts.push(now);
      securityUtils.rateLimiter.attempts[key] = validAttempts;
      
      return true;
    }
  }
};
