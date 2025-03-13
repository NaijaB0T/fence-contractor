
import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');

if (container) {
  if (container.innerHTML.trim().length) {
    // If we have content in the container, we're doing hydration
    hydrateRoot(
      container,
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  } else {
    // Normal client-side rendering
    createRoot(container).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}
