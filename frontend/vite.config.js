import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    define: {
      __MNEMONIC__: `"${process.env.VITE_MNEMONIC}"`,
      __CHAIN_ID__: `"${process.env.VITE_CHAIN_ID}"`,
      __SECRET_URL__: `"${process.env.VITE_SECRET_URL}"`,
      __DENOM__: `"${process.env.VITE_DENOM}"`,
      __CONTRACT_ADDRESS__:`"${process.env.VITE_CONTRACT_ADDRESS}"`,
      __CODE_HASH__:`"${process.env.VITE_CODE_HASH}"`,
    },
    plugins: [
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
