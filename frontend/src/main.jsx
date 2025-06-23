import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import { store } from './store/store.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AnimatedCursor from "react-animated-cursor"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <AnimatedCursor
        innerSize={10}
        outerSize={20}
        color='234, 179, 8'
        outerAlpha={.5}
        innerScale={1}
        outerScale={2}
        innerStyle={{
          backgroundColor: '#fac11a',
        }}
        outerStyle={{
          backgroundColor: '#129cdbab',
        }}
        clickables={[
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'textarea',
        ]}
      />
      <ToastContainer limit={1} />
    </QueryClientProvider>
  </Provider>
);
