/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  build: {
    // Use esbuild for fast, aggressive minification (dead-code elimination)
    minify: 'esbuild',
    // Modern target — smaller output, less polyfill overhead
    target: 'es2020',
    // Each page chunk gets its own CSS file — only loaded when needed
    cssCodeSplit: true,
    // Skip reporting compressed size to speed up the build output step
    reportCompressedSize: false,
    // Don't inline assets as base64 — keep them as separate cacheable files
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — loaded on every page
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-redux', 'redux', 'redux-thunk'],
          // MUI split — icons are large and only needed selectively
          'vendor-mui-core': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'vendor-mui-icons': ['@mui/icons-material'],
          // Framer Motion — animation lib only needed on animated pages
          'vendor-framer': ['framer-motion'],
          // General utilities
          'vendor-utils': ['axios', 'dayjs', 'formik', 'yup'],
          // Swiper — carousel, only used on Home
          'vendor-swiper': ['swiper'],
          // Azure SDK is very large — isolate so it only loads for upload/dashboard
          'vendor-azure': ['@azure/storage-blob'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})
