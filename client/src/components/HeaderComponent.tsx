import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import '../styles/global.css'

const { Header } = Layout;

const HeaderComponent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return !isHomePage ? <Header style={{ backgroundColor: "#3be477", color: 'white'}} className='full-width-header'></Header> : null;
};
export default HeaderComponent;

