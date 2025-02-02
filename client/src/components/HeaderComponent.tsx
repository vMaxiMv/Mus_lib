import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import '../styles/global.css'
import BackButton from './buttons/BackButton';

const { Header } = Layout;

const HeaderComponent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return !isHomePage ? 
    <Header style={{ backgroundColor: "#63f798", color: 'white', display: 'flex'}} className='full-width-header'>
      <Link to="/"><img src="/images/logo1.png" alt="Логотип" className='header-logo' /></Link>
      <BackButton/>
    </Header> : null;
};
export default HeaderComponent;

