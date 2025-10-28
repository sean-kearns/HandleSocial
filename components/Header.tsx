import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GoogleIcon, MenuIcon, XMarkIcon } from './icons/SocialIcons';

type View = 'dashboard' | 'about' | 'login' | 'marketplace' | 'brandView';

interface HeaderProps {
  onNavigate: (view: View) => void;
  currentView: View;
}

const NavLink: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
    className?: string;
}> = ({ onClick, isActive, children, className = '' }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-left ${
            isActive
                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        } ${className}`}
    >
        {children}
    </button>
);


const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const { user, login, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNav = (view: View) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };
  
  const handleMobileLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div onClick={() => handleMobileNav(user ? 'dashboard' : 'login')} className="flex items-center cursor-pointer">
            <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h1 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">Handle Social</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-4">
            <nav className="flex items-center space-x-2">
                <NavLink onClick={() => onNavigate('about')} isActive={currentView === 'about'}>About</NavLink>
                {user && (
                    <>
                        <NavLink onClick={() => onNavigate('marketplace')} isActive={currentView === 'marketplace'}>Marketplace</NavLink>
                        <NavLink onClick={() => onNavigate('dashboard')} isActive={currentView === 'dashboard'}>Dashboard</NavLink>
                    </>
                )}
            </nav>
            
            {user ? (
              <>
                <div className="flex items-center space-x-2 md:space-x-4">
                   <div onClick={() => onNavigate('dashboard')} className="cursor-pointer">
                      <img className="h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-800 ring-primary-500" src={user.profilePictureUrl} alt="User profile" />
                  </div>
                  <button
                    onClick={logout}
                    disabled={loading}
                    className="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    Logout
                  </button>
                </div>
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
                <NavLink 
                    onClick={() => onNavigate('brandView')} 
                    isActive={currentView === 'brandView'}
                    className="!text-primary-600 !dark:text-primary-400 font-semibold !w-auto"
                >
                    Brand View
                </NavLink>
              </>
            ) : (
              <button
                onClick={login}
                disabled={loading}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <GoogleIcon className="w-5 h-5 mr-2" />
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink onClick={() => handleMobileNav('about')} isActive={currentView === 'about'}>About</NavLink>
            {user ? (
                <>
                    <NavLink onClick={() => handleMobileNav('marketplace')} isActive={currentView === 'marketplace'}>Marketplace</NavLink>
                    <NavLink onClick={() => handleMobileNav('dashboard')} isActive={currentView === 'dashboard'}>Dashboard</NavLink>
                    <NavLink 
                        onClick={() => handleMobileNav('brandView')} 
                        isActive={currentView === 'brandView'}
                        className="!text-primary-600 !dark:text-primary-400 font-semibold"
                    >
                        Brand View
                    </NavLink>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <div className="flex items-center justify-between p-2">
                        <div className="flex items-center">
                            <img className="h-8 w-8 rounded-full" src={user.profilePictureUrl} alt="User profile" />
                            <span className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-200">{user.name}</span>
                        </div>
                        <button
                            onClick={handleMobileLogout}
                            disabled={loading}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50"
                        >
                            Logout
                        </button>
                    </div>
                </>
            ) : (
                <div className="p-2">
                    <button
                        onClick={login}
                        disabled={loading}
                        className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                        <GoogleIcon className="w-5 h-5 mr-2" />
                        Login with Google
                    </button>
                </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;