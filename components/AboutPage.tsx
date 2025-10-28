import React from 'react';

type View = 'marketplace' | 'dashboard' | 'brandView';

interface AboutPageProps {
  onBack: () => void;
  onNavigate: (view: View) => void;
}

const NavigableText: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
}> = ({ onClick, children }) => (
    <strong 
        onClick={onClick}
        className="text-primary-600 dark:text-primary-400 cursor-pointer hover:underline"
    >
        {children}
    </strong>
);

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">About Handle Social</h2>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Own your social data. Get paid when brands use it.</p>
      
      <div className="mt-8 space-y-8 text-gray-700 dark:text-gray-300">
        <div>
          <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">What is Handle Social?</h3>
          <p className="mt-2">
            Handle Social is a platform built on a simple, powerful idea: your online identity has value, and you should be the one to benefit from it. We provide a central place to consolidate your social media handles, verify your ownership, and allow brands to request access to this data for marketing and analytics, with the payments going directly to you.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">How It Works</h3>
          <ol className="mt-2 list-decimal list-inside space-y-2">
            <li><strong>Add & Verify Handles:</strong> On your Dashboard, link all your social media profiles. Verifying them increases their value.</li>
            <li><strong>Explore Value:</strong> Visit the Marketplace to see how much different social handles are worth based on platform and verification status.</li>
            <li><strong>Get Paid:</strong> Brands request your data through the platform, and you earn money for every verified data point they access.</li>
            <li><strong>Boost Earnings:</strong> Increase your "Verifiability Score" on the Dashboard to earn even more for your data.</li>
          </ol>
        </div>
        
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
             <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Get Started</h3>
            <div className="space-y-4">
                 <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">For Data Owners (You!)</h4>
                    <p className="mt-1 text-sm">
                        Start by exploring the <NavigableText onClick={() => onNavigate('marketplace')}>Marketplace</NavigableText> to see live data rates. Then, log in to access your <NavigableText onClick={() => onNavigate('dashboard')}>Dashboard</NavigableText>, where you can add your social handles, increase your verifiability score, and watch your earnings grow!
                    </p>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">For Brands</h4>
                    <p className="mt-1 text-sm">
                        Interested in understanding your customers on a deeper level? Check out the <NavigableText onClick={() => onNavigate('brandView')}>Brand View</NavigableText> for a sample of the powerful ecosystem insights we provide. See breakdowns of our user base and the kind of audience analysis available.
                    </p>
                </div>
            </div>
        </div>


        <div>
          <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">Reach Out to Us</h3>
          <p className="mt-2">
            Are you a brand that wants to activate on social data and truly understand who your customers follow across all of their platforms? Users often look very different across social media, and understanding them requires looking across all channels.
          </p>
           <p className="mt-2 font-semibold">
            Take a big step in understanding your customers, their behaviors, and who they are!
          </p>
          <a 
            href="mailto:seanpjk@gmail.com"
            className="mt-4 inline-block px-5 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
          >
            Contact Us
          </a>
        </div>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/50 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-r-lg">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Disclaimer</h4>
            <p className="mt-1 text-yellow-700 dark:text-yellow-300">
                This application is currently a concept demonstration. No real money is being exchanged, and connections to actual social media platforms are simulated. All data is for illustrative purposes only.
            </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={onBack}
          className="px-6 py-2 text-sm font-medium text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/50 rounded-md hover:bg-primary-200 dark:hover:bg-primary-800/50"
        >
          Back
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;