// vitest.config.ts

import path from 'node:path'
// import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'
// import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// const dirname =
//   typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    // 明確設定使用自動 JSX 執行環境
    react({
      jsxRuntime: 'automatic',
    }),
    tsconfigPaths(),
    vanillaExtractPlugin(),
  ],
  test: {
    projects: [
      // 專案一：Storybook 整合測試，暫時關閉
      // {
      //   extends: true,
      //   plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
      //   test: {
      //     name: 'storybook',
      //     browser: {
      //       enabled: true,
      //       headless: true,
      //       provider: 'playwright',
      //       instances: [{ browser: 'chromium' }],
      //     },
      //     setupFiles: ['.storybook/vitest.setup.ts'],
      //   },
      // },
      // 專案二：單元測試
      {
        extends: true,
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: ['app/tests/setup.ts'],
          include: ['**/tests/**/*.test.ts?(x)'],
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './'),
          },
        },
      },
    ],
  },
})
