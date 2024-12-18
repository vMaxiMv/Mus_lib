import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from './components/AppRouter';
import { Layout } from 'antd';
import HeaderComponent from './components/HeaderComponent';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <Layout >
      <HeaderComponent />
        <AppRouter/>
      </Layout>
    </Router>
  )
}

export default App;
