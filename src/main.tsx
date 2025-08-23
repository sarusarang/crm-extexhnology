import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.tsx'



const queryClient = new QueryClient()



createRoot(document.getElementById('root')!).render(

  <BrowserRouter>

    <ThemeProvider defaultTheme="light" storageKey="dashboard-theme">

      <AuthProvider>

        <QueryClientProvider client={queryClient}>

          <App />

        </QueryClientProvider>

      </AuthProvider>

    </ThemeProvider>

  </BrowserRouter>

)
