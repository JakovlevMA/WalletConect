import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
/////////// проверка)
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  }
})
