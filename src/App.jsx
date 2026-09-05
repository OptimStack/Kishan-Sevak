// src/App.jsx
import React, { useEffect, useState } from 'react';
import { AuthPage, Navbar, Croprow, Pricecard } from "#components";
import { FarmerDash, BuyerDash, AdminDash } from "#views";

const defaultFarmerListings = [];

const readStoredList = (key, fallback) => {
  try {
    const storedValue = window.localStorage.getItem(key);
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;
    return Array.isArray(parsedValue) ? parsedValue : fallback;
  } catch {
    return fallback;
  }
};

const readFarmerListings = () => {
  const listings = readStoredList('krishilink-farmer-listings', defaultFarmerListings)
    .filter((listing) => !['1', '2'].includes(listing.id));
  const cleanupKey = 'krishilink-remove-recent-farmer-ask-v1';

  if (!window.localStorage.getItem(cleanupKey)) {
    window.localStorage.setItem(cleanupKey, 'true');
    return listings.slice(1);
  }

  return listings;
};

const readVerification = (role) => {
  try {
    return JSON.parse(window.localStorage.getItem(`kishansevak-${role}-verification`)) || null;
  } catch {
    return null;
  }
};

const App = () => {
  const [role, setRole] = useState(null);
  const [authMode, setAuthMode] = useState('landing');
  const [lang, setLang] = useState('en');    // Default language configuration
  const [verification, setVerification] = useState(() => ({ farmer: readVerification('farmer'), buyer: readVerification('buyer') }));
  const [farmerListings, setFarmerListings] = useState(readFarmerListings);
  const [buyerBids, setBuyerBids] = useState(() => readStoredList('krishilink-buyer-bids', []));
  const [isDarkMode, setIsDarkMode] = useState(() => (
    typeof window !== 'undefined' && window.localStorage.getItem('krishilink-theme') === 'dark'
  ));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('krishilink-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    window.localStorage.setItem('krishilink-farmer-listings', JSON.stringify(farmerListings));
  }, [farmerListings]);

  useEffect(() => {
    window.localStorage.setItem('krishilink-buyer-bids', JSON.stringify(buyerBids));
  }, [buyerBids]);

  const handleRoleChange = (nextRole, nextMode) => {
    setRole(nextRole);
    setAuthMode(nextMode || (verification[nextRole] ? 'dashboard' : 'landing'));
  };

  const handleVerified = (profile) => {
    setVerification((current) => ({ ...current, [profile.role]: profile }));
    setAuthMode('dashboard');
  };

  const handleLogout = () => {
    setRole(null);
    setAuthMode('landing');
  };

  const isDashboardReady = Boolean(role && verification[role] && authMode === 'dashboard');

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 font-sans text-gray-900 transition-colors duration-200 dark:bg-[#071a14] dark:text-slate-100">
      {/* Passing states down as props */}
      {isDashboardReady ? <>
        <Navbar currentRole={role} setRole={handleRoleChange} onLogout={handleLogout} currentLang={lang} setLang={setLang} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          {role === 'farmer' && <FarmerDash language={lang} listings={farmerListings} setListings={setFarmerListings} buyerBids={buyerBids} />}
          {role === 'buyer' && <BuyerDash language={lang} farmerListings={farmerListings} buyerBids={buyerBids} setBuyerBids={setBuyerBids} />}
        </main>
      </> : <AuthPage role={role} authMode={authMode} onRoleSelect={handleRoleChange} language={lang} setLanguage={setLang} onVerified={handleVerified} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
    </div>
  );
}

export default App;
