import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                // target: 'https://blog-api-service-ayvy.onrender.com',
                target: 'http://localhost:5050',
                changeOrigin: true,
            },
        },
    },
})
