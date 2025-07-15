import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx', 
                'resources/js/Pages/DashRoot.jsx'
            ],
            refresh: true,
            valetTls: true,
        }),
        react(),
    ],
    server: {
        host: true,
        hmr: {
            host: process.env.VITE_APP_URL ? new URL(process.env.VITE_APP_URL).hostname : 'localhost',
        },
        port: 5176,
    },
});
