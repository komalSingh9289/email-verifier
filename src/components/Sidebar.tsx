import React from 'react';
import { LayoutDashboard, UserCheck, History, CreditCard, Menu, X } from 'lucide-react';

interface SidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navItems = [
    
    { name: 'Contact Verifier', icon: UserCheck, current: true },
    { name: 'History', icon: History, current: false },
    { name: 'Credits', icon: CreditCard, current: false },
  ];

  return (
    <>
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar for mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out transform 
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <div className="flex items-center">
            <LayoutDashboard className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-xl font-semibold text-white">Dashboard</span>
          </div>
          <button 
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6 px-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`
                group flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors duration-150 
                ${item.current 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
              `}
            >
              <item.icon className={`
                mr-3 h-5 w-5 transition-colors duration-150
                ${item.current ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'}
              `} />
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-20 m-4">
        <button
          className="p-2 rounded-md text-gray-700 bg-white shadow-md hover:text-gray-900 focus:outline-none"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </>
  );
};