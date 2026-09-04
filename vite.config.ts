import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'download-headers',
      configureServer(server) {
        server.middlewares.use((req: any, res: any, next: any) => {
          const url = req?.url as string | undefined
          if (url?.startsWith('/downloads/')) {
            const filename = url.split('?')[0]?.split('/').pop()
            if (filename) {
              res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
            }
          }
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((req: any, res: any, next: any) => {
          const url = req?.url as string | undefined
          if (url?.startsWith('/downloads/')) {
            const filename = url.split('?')[0]?.split('/').pop()
            if (filename) {
              res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
            }
          }
          next()
        })
      }
    }
  ],
  server: {
    port: 5173,
    host: true
  }
})
