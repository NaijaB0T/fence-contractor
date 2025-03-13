const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const serveStatic = require('serve-static');
const { createServer: createViteServer } = require('vite');

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 8080;

async function createServer() {
  const app = express();
  
  app.use(compression());
  
  let vite;
  if (!isProduction) {
    // In development: create a Vite server in middleware mode
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    
    // Use Vite's connect middleware
    app.use(vite.middlewares);
  } else {
    // In production: serve built files
    app.use(serveStatic(path.resolve(__dirname, 'dist/client'), {
      index: false
    }));
  }
  
  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    
    try {
      let template, render;
      
      if (!isProduction) {
        // In development
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        
        // Load the server entry with Vite's HMR
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        // In production
        template = fs.readFileSync(path.resolve(__dirname, 'dist/client/index.html'), 'utf-8');
        render = require('./dist/server/entry-server.js').render;
      }
      
      const appHtml = await render(url);
      const html = template.replace('<!--app-html-->', appHtml);
      
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace
      !isProduction && vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

createServer();
