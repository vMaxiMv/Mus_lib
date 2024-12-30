import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from './components/AppRouter';
import { Layout } from 'antd';
import HeaderComponent from './components/HeaderComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { Header, Content, Footer } = Layout;

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout >
        <HeaderComponent />
        <AppRouter/>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App;
