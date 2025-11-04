import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import sourceIdentifierPlugin from 'vite-plugin-source-identifier'

const isProd = process.env.BUILD_MODE === 'prod'
export default defineConfig({
  plugins: [
    react(), 
    sourceIdentifierPlugin({
      enabled: !isProd,
      attributePrefix: 'data-matrix',
      includeProps: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React and React-DOM chunk
          'react-vendor': ['react', 'react-dom'],
          // Supabase chunk
          'supabase-vendor': ['@supabase/supabase-js'],
          // UI components chunk
          'ui-vendor': ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-tabs'],
          // Utility chunks
          'date-vendor': ['date-fns', 'react-day-picker'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    target: 'es2015',
    minify: 'esbuild',
    sourcemap: false,
    // Optimize chunks to reduce warnings
    chunkSizeWarningLimit: 1000, // Increase warning limit
    assetsInlineLimit: 4096 // Inline small assets
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@supabase/supabase-js',
      'lucide-react',
      'date-fns',
      'react-day-picker'
    ]
  }
})