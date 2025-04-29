import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@constants': path.resolve(__dirname, './src/config/constants'),
      '@context': path.resolve(__dirname, './src/layout/context'),
      '@features': path.resolve(__dirname, './src/features'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@router': path.resolve(__dirname, './src/router'),
      '@styles': path.resolve(__dirname, './src/ui/styles'),
      '@themes': path.resolve(__dirname, './src/ui/themes'),
      '@utilities': path.resolve(__dirname, './src/utilities'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@common': path.resolve(__dirname, './src/common'),
      '@langs': path.resolve(__dirname, './src/langs'),
    },
  }
})
