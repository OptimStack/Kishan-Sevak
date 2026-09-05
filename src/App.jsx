import React, { useState } from 'react';
import { Navbar } from "#components";
import { FarmerDash, BuyerDash, AdminDash, CropRegistration } from "#views";
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';

const App = () => {
  const [role, setRole] = useState('farmer');
  const [lang, setLang] = useState('en');
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
        <Navbar currentRole={role} setRole={setRole} currentLang={lang} setLang={setLang} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex justify-end">
          <ThemeToggle />
        </div>

        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {role === 'farmer' && (
            currentView === 'dashboard' ? (
              <FarmerDash language={lang} navigateToRegister={() => setCurrentView('register')} />
            ) : (
              <CropRegistration language={lang} onBack={() => setCurrentView('dashboard')} />
            )
          )}

          {role === 'buyer' && <BuyerDash language={lang} />}

          {role === 'admin' && <AdminDash language={lang} />}

          {role !== 'farmer' && role !== 'buyer' && role !== 'admin' && (
            <p className="text-sm text-slate-500 dark:text-slate-400">Unknown role selected.</p>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;