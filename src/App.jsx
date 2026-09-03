// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FarmerDash from './views/FarmerDash';
import BuyerDash from './views/BuyerDash';
// import AdminDash from './views/AdminDash';

const App = () => {
  const [role, setRole] = useState('farmer'); // Default view state
  const [lang, setLang] = useState('en');    // Default language configuration

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Passing states down as props */}
      <Navbar currentRole={role} setRole={setRole} currentLang={lang} setLang={setLang} />
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {role === 'farmer' && <FarmerDash language={lang} />}
        {role === 'buyer' && <BuyerDash language={lang} />}
        {/* {role === 'admin' && <AdminDash language={lang} />} */}
      </main>
    </div>
  );
}

export default App;
