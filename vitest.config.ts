// vitest.config.ts

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    projects: [
      // 專案一：Storybook 整合測試
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      // 專案二：單元測試
      {
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: ['app/tests/setup.ts'],
          include: ['app/**/*.test.ts?(x)'],
        },
      },
    ],
  },
})
