/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    return {
        root: './src',
        publicDir: './public',
        envDir: '../',
        build: {
            outDir: '../dist',
            sourcemap: command === 'serve' ? 'inline' : false,
        },
        plugins: [
            react(),
            tsconfigPaths(),
            vanillaExtractPlugin(),
        ],
        test: {
            environment: 'happy-dom',
        },
    };
});
