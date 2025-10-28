import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AboutPage from './components/AboutPage';
import MarketplacePage from './components/MarketplacePage';
import BrandView from './components/BrandView';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

type View = 'login' | 'about' | 'dashboard' | 'marketplace' | 'brandView';

const Main: React.FC = () => {
  const { user, loading } = useAuth();
  const [view, setView] = useState<View>('login');

  useEffect(() => {
    if (!loading) {
      if (!user && (view === 'dashboard' || view === 'marketplace' || view === 'brandView')) {
        setView('login');
      } else if (user && view === 'login') {
        setView('dashboard');
      }
    }
  }, [user, loading, view]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-t-transparent border-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  const renderContent = () => {
    if (!user) {
        if (view === 'about') return <AboutPage onNavigate={setView} onBack={() => setView('login')} />;
        return <LoginPage onNavigate={() => setView('about')} />;
    }

    switch (view) {
        case 'dashboard':
            return <Dashboard onNavigate={setView} />;
        case 'marketplace':
            return <MarketplacePage />;
        case 'brandView':
            return <BrandView />;
        case 'about':
            return <AboutPage onNavigate={setView} onBack={() => setView('dashboard')} />;
        default:
             return <Dashboard onNavigate={setView} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header onNavigate={setView} currentView={view} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;