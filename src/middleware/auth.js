// Middleware de autenticação e autorização

export const authMiddleware = {
  // Verifica se o usuário está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    if (!token) return false;
    
    try {
      // Verifica se o token não está expirado
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  },

  // Obtém informações do usuário
  getUser: () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  },

  // Verifica se o usuário tem a role necessária
  hasRole: (requiredRole) => {
    const user = authMiddleware.getUser();
    return user && user.role === requiredRole;
  },

  // Faz logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Protege rotas
  requireAuth: (requiredRole = null) => {
    if (!authMiddleware.isAuthenticated()) {
      window.location.href = '/login';
      return false;
    }
    
    if (requiredRole && !authMiddleware.hasRole(requiredRole)) {
      window.location.href = '/unauthorized';
      return false;
    }
    
    return true;
  }
};
