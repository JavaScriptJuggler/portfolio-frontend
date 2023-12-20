import React from 'react';
import '../../assets/frontend_assets/font-awesome/v6/brands.css'
import '../../assets/frontend_assets/font-awesome/v6/solid.css'
import '../../assets/frontend_assets/font-awesome/v6/fontawesome.css'
import '../../assets/frontend_assets/styles/main.css'
import Header from '../frontend_component/Header';
import Footer from '../frontend_component/Footer';

function UserLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default UserLayout;
