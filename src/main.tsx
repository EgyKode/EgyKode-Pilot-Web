import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (container) {
  const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Check if container already contains server/static pre-rendered elements
  const hasRenderedElements = Array.from(container.childNodes).some(
    (node) => node.nodeType === Node.ELEMENT_NODE
  );

  if (hasRenderedElements) {
    ReactDOM.hydrateRoot(container, app);
  } else {
    ReactDOM.createRoot(container).render(app);
  }
}
