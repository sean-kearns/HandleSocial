import React from 'react';

type IconProps = {
  className?: string;
  title?: string;
};

export const GoogleIcon: React.FC<IconProps> = ({ className, title }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>{title}</title>
    <path d="M44.5 24.3H42V24H24V28H35.4C34.3 32.5 30.2 36 24 36C17.4 36 12 30.6 12 24C12 17.4 17.4 12 24 12C27.3 12 30.2 13.4 32.3 15.6L35.2 12.7C32.1 9.8 28.3 8 24 8C15.2 8 8 15.2 8 24C8 32.8 15.2 40 24 40C32.8 40 40 32.8 40 24C40 22.1 39.8 20.3 39.5 18.6L44.5 24.3Z" fill="#FFC107"/>
    <path d="M6.3 14.7L12.9 19.3C14.1 16.5 16.8 14.3 20.1 13.1L6.3 14.7Z" fill="#FF3D00"/>
    <path d="M24 44C32.1 44 38.7 38.2 40 30.8L32.2 26.2C30.6 30.4 26.9 33 22.7 33L24 44Z" fill="#4CAF50"/>
    <path d="M42.6 11.1L35.1 16.2C36.6 18.5 37.3 21.2 37.3 24H42.6V11.1Z" fill="#1976D2"/>
  </svg>
);
export const InstagramIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
export const TwitterIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.62 9.47c.02.13.02.26.02.4 0 4.05-3.08 8.71-8.71 8.71-1.73 0-3.34-.5-4.7-1.37.24.03.48.04.73.04 1.43 0 2.75-.48 3.8-1.31-1.34-.02-2.47-.9-2.86-2.1.18.03.37.05.56.05.28 0 .55-.04.8-.1-1.4-.28-2.45-1.51-2.45-2.98v-.04c.41.22.88.36 1.37.38-1.2-.81-1.62-2.4-1.12-3.8.76 1.83 2.76 3.4 5.3 3.65-.05-.22-.08-.45-.08-.68 0-1.65 1.34-2.99 2.99-2.99.86 0 1.63.36 2.18.95.68-.13 1.32-.38 1.88-.71-.22.7-.7 1.29-1.32 1.66.6-.07 1.17-.23 1.69-.46-.41.6-.94 1.1-1.54 1.47z"></path></svg>
);
export const RedditIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.75C7.994 4.75 4.75 7.994 4.75 12c0 4.006 3.244 7.25 7.25 7.25s7.25-3.244 7.25-7.25S16.006 4.75 12 4.75zm3.17 7.72h-1.99c0 .5-.01 1-.01 1.5h1.5v1.25h-1.5c0 .5 0 1 .01 1.5h1.99v1.25H10.83v-1.25c.02-.5.03-1 .03-1.5H9.33v-1.25h1.53c0-.5.01-1 .01-1.5H9.33V11.22h5.84v1.25zM12 8.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"></path></svg>
);
export const SnapchatIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-8h4v4h-4v-4z"></path></svg>
);
export const TikTokIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.01 13.06c-1.3 0-2.35-1.05-2.35-2.35s1.05-2.35 2.35-2.35V6.5h2.02v4.21c1.3 0 2.35 1.05 2.35 2.35s-1.05 2.35-2.35 2.35h-2.02z"></path></svg>
);
export const GitHubIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.25-.25-4.61-1.12-4.61-5 0-1.1.39-2.01 1.03-2.72-.1-.26-.45-1.29.1-2.69 0 0 .85-.27 2.79 1.02.81-.22 1.67-.33 2.53-.33s1.72.11 2.53.33c1.94-1.29 2.79-1.02 2.79-1.02.55 1.4.2 2.43.1 2.69.64.71 1.03 1.62 1.03 2.72 0 3.89-2.37 4.74-4.62 5 .36.31.68.92.68 1.85v2.72c0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"></path></svg>
);
export const FacebookIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z"></path></svg>
);
export const YouTubeIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path d="M21.582 7.306s-.195-1.378-.808-1.991c-.783-.807-1.66-.807-2.072-.857C16.297 4.3 12 4.3 12 4.3s-4.297 0-6.702.158c-.412.05-1.289.05-2.072.857-.613.613-.808 1.99-.808 1.99S2.223 8.944 2.223 10.58v2.838c0 1.638.195 3.273.195 3.273s.195 1.378.808 1.991c.783.807 1.83.78 2.268.864 1.6.134 6.508.157 6.508.157s4.297 0 6.702-.158c.412-.05 1.289-.05 2.072-.857.613-.613.808-1.99.808-1.99s.195-1.638.195-3.273v-2.838c0-1.638-.195-3.274-.195-3.274zm-11.995 7.61V8.75l5.617 3.08-5.617 3.086z"></path></svg>
);
export const CheckCircleIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
);
export const ExclamationTriangleIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 4a1 1 0 112 0v6a1 1 0 11-2 0V4zm2 10a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"></path></svg>
);
export const PlusCircleIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
export const XMarkIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);
export const PuzzlePieceIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
);
export const ShieldCheckIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);
export const UsersIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-11a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
export const CreditCardIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
);
export const MoneyBagIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h12v4a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 6a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 00-2-2H4z" clipRule="evenodd" /><path d="M7 12.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM7 14.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" /></svg>
);
export const MenuIcon: React.FC<IconProps> = ({ className, title }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>{title}</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
);