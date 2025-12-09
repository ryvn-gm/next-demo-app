import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true, // 允許直接使用 describe, it, expect 而不需 import
        setupFiles: ['./vitest.setup.ts'], // 需要建立這個檔案來引入 jest-dom
        include: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
        alias: {
            '@': path.resolve(__dirname, './'),
        },
    },
});
