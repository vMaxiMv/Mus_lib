import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from './components/AppRouter';
import { Layout } from 'antd';
import HeaderComponent from './components/HeaderComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
       
          <HeaderComponent />
          <AppRouter/>
        
      </Router>
    </QueryClientProvider>
  )
}

export default App;
