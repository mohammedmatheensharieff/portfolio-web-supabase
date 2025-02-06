import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    open: false, // Disable automatic browser opening
  },
  preview: {
    open: false, // Disable automatic preview opening
  }
});