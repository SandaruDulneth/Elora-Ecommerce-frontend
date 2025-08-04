import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
    //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
    //910626366800-3sje4q2ppolcin3cck7n75q7lhndsmcf.apps.googleusercontent.com
  plugins: [react(),tailwindcss()],
})


