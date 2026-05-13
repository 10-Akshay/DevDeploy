import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/deploy': 'http://localhost:4000',
      '/status': 'http://localhost:4000',
    },
  },
});
