import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AuthUserContext from "./context/AuthContext.jsx";
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import React from 'react';

import "react-toastify/dist/ReactToastify.css";
import './styles/index.css';


const htmlRoot = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(htmlRoot);


// crate a instance from QueryClient() for sharing at whole application
const queryClient = new QueryClient();


reactRoot.render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>

      <AuthUserContext>

        <Router>
          <App />
        </Router>

      </AuthUserContext>

      {/* for dev tool at browser */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

    <ToastContainer theme="dark" position="top-right" autoClose={5000} />

  </React.StrictMode>,
)
