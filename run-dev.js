
const { spawn } = require('child_process');

// Start Vite's build process with SSR enabled
const vite = spawn('node_modules/.bin/vite', ['build', '--ssr', 'src/entry-server.tsx', '--outDir', 'dist/server'], {
  stdio: 'inherit',
  shell: true
});

vite.on('close', (code) => {
  if (code !== 0) {
    console.error('Vite build failed');
    process.exit(code);
  }
  
  // After SSR build completes, start the server
  const server = spawn('node', ['server.js'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  
  server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });
});
