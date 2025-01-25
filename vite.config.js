import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import React from 'react';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // '@' points to the 'src' directory
    },
  },
});
