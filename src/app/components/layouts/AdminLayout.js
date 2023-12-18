"use client";
import React from 'react';
import '../../assets/admin_assets/css/bootstrap.min.css';
import '../../assets/admin_assets/css/style.css';
import { usePathname } from 'next/navigation';
import Sidebar from '../admin_components/Sidebar';
import ContentNavBar from '../admin_components/ContentNavBar';
import Script from 'next/script';
import Footer from '../admin_components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminLayout({ children }) {
  const pathname = usePathname();
  return (
    <>
      <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js'></Script>
      {pathname == '/admin/login' ? (
        <div className="container-fluid">
          {children}
        </div>
      ) : pathname.startsWith('/admin/') ? (
        <>
          <ToastContainer />
          <div className="container-xxl position-relative bg-white d-flex p-0">
            <Sidebar />
            <div className="content">
              <ContentNavBar />
              <div className="container-fluid pt-4 px-4">{children}</div>
              <Footer />
            </div>
          </div>
        </>
      ) : ""}
    </>
  );
}

export default AdminLayout;
