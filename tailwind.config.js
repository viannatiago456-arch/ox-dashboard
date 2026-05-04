/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#0F0F1A',
        'bg-card': '#1A1A2E',
        'bg-sidebar': '#12121F',
        
        // Brand colors
        'brand-primary': '#00D4AA',
        'brand-secondary': '#6C63FF',
        
        // Text colors
        'text-primary': '#F1F1F1',
        'text-secondary': '#9CA3AF',
        
        // Border colors
        'border-default': '#2A2A3E',
        
        // Status colors
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
