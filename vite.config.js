import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        management: resolve(__dirname, 'management.html'),
        join: resolve(__dirname, 'join.html')
      },
    },
  },
});