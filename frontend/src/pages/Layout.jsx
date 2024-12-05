import React from 'react';
import Header from '../components/Header';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
