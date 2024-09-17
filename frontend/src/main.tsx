import { createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import './index.css';
axios.defaults.baseURL = 'http://localhost:1000/api/v1'; // Storing the base URL of the backend routes
axios.defaults.withCredentials = true; //Enabling the sharing of cookies between cliend and server.

//Using MUI Creating a theme
const theme = createTheme({
  typography:{
    fontFamily:"Roboto Slab,serif",
    allVariants: { color: "white" },
  },
});

// The createRoot function mounts the React application into the DOM element with the id root.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster position="top-center"/>
        <App />
      </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
// StrictMode: Wraps the entire application to activate additional development checks and warnings.
// BrowserRouter: Enables client-side routing, allowing the app to manage navigation and URL changes without a full page reload.
// ThemeProvider: Applies the MUI theme configuration to all child components, ensuring consistent styling across MUI components.
// App: The root component that contains the primary structure and logic of your application, including routes, layout, and other components.