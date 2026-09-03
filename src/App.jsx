// src/App.jsx
import React, { useState } from 'react';
import { Navbar, Croprow, Pricecard } from "#components";
import { FarmerDash, BuyerDash, AdminDash, CropRegistration } from "#views";

const App = () => {
  const [role, setRole] = useState('farmer'); 
  const [lang, setLang] = useState('en');    
  const [currentView, setCurrentView] = useState('dashboard'); // Handles internal page routing

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar currentRole={role} setRole={setRole} currentLang={lang} setLang={setLang} />
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {role === 'farmer' && (
          currentView === 'dashboard' ? (
            <FarmerDash language={lang} navigateToRegister={() => setCurrentView('register')} />
          ) : (
            <CropRegistration language={lang} onBack={() => setCurrentView('dashboard')} />
          )
        )}
        
        {role === 'buyer' && <BuyerDash language={lang} />}
      </main>
    </div>
  );
}