import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'ForkUWeatherAware',
      fileName: () => 'fork_u-weather_aware.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]',
        inlineDynamicImports: true,
      },
    },
    target: 'es2020',
    minify: 'esbuild',
  },
  worker: {
    format: 'iife',
    rollupOptions: {
      output: {
        entryFileNames: 'workers/[name].js',
      },
    },
  },
});
