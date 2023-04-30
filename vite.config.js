import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({

    server: {
        https: true,
        cors: {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": true,
            "optionsSuccessStatus": 204
          },
        hmr: {
            clientPort: 443,
            host: `${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
        }
    },
    plugins: [
        laravel(['resources/js/app.jsx']),
        react(),
    ],
});
