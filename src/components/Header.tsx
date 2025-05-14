import React from 'react';
import { Bell, User  } from 'lucide-react';

interface HeaderProps {
  setMobileMenuOpen: (open: boolean) => void;
  username: string;
}

export const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <h1 className="text-xl md:text-2xl font-bold sm:pl-14 md:pl-2 text-gray-800">
          Welcome back, {username}!
        </h1>
        <div className="flex items-center space-x-4">
          <button className="relative p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>
          <div className="relative">
            <button className="flex items-center">
              <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
              <User  className=" text-blue-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};