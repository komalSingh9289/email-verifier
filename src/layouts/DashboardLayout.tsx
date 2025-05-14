import React, { ReactNode, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

interface DashboardLayoutProps {
  children: ReactNode;
  user: string;

}

 const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setMobileMenuOpen={setMobileMenuOpen} username={user}/>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
        <footer className="px-6 py-4 bg-white border-t">
          <p className="text-center text-sm text-gray-500">
            © 2024 Contact Verifier
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;