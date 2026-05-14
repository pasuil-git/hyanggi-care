import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = ({ children }) => {
  return (
    <div className="app-wrapper flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 md:pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
