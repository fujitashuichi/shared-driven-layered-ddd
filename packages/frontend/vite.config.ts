import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode ,process.cwd());
  const authUrl = env.VITE_AUTH_URL;

  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    define: {
      'process.env': {}
    },
    server: {
      proxy: {
        "/api/auth/error": {
          target: "/auth/error"
        },
        '/api': {
          target: authUrl,
          changeOrigin: true,
        },
      },
    },
  }
})
