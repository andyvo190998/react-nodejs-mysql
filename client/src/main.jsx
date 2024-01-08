import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './context/authContext.jsx';
import { SnackbarProvider, useSnackbar } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <SnackbarProvider autoHideDuration={3000}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </SnackbarProvider>
  </>
);
