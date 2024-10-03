import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    optimizeDeps: {
        include: ['sweetalert2-react-content'],
      },
    plugins: [
        react(),
    ],
});