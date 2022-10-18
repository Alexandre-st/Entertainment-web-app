import React from 'react';
import { createRoot } from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import store from './app/store';

// Local import 
import App from './App';

const app = document.getElementById('root');
const root = createRoot(app);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
