import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GoogleIcon } from './icons/SocialIcons';

interface LoginPageProps {
    onNavigate: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, loading } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: 'calc(100vh - 128px)' }}>
      <div className="bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-lg max-w-md w-full">
        <svg className="mx-auto h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Welcome to Handle Social</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Own your social data. Get paid when brands use it.
        </p>
        <div className="mt-8">
          <button
            onClick={login}
            disabled={loading}
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                Authenticating...
              </>
            ) : (
              <>
                <GoogleIcon className="w-6 h-6 mr-3" />
                Sign in with Google
              </>
            )}
          </button>
        </div>
        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(); }} className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Learn more about Handle Social
            </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;