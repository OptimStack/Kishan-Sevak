import React, { useState } from 'react';
import { Leaf, Globe, User, Bell, ChevronDown } from 'lucide-react';

export default function Navbar({ currentRole, setRole, currentLang, setLang }) {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const roles = [
    { id: 'farmer', label: 'Farmer Dashboard (शेतकरी)' },
    { id: 'buyer', label: 'Buyer Marketplace (खरेदीदार)' },
    { id: 'admin', label: 'Govt Admin Portal (प्रशासक)' }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'hi', label: 'हिन्दी (Hindi)' }
  ];

  return (
    <nav className="bg-emerald-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Brand Logo and Title */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="bg-white p-2 rounded-full text-emerald-700">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-wide block leading-tight">
                KrishiLink
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">    
            <div className="relative">
              <button 
                onClick={() => { setIsRoleDropdownOpen(!isRoleDropdownOpen); setIsLangDropdownOpen(false); }}
                className="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-950 px-4 py-2 rounded-lg text-sm font-medium border border-emerald-600 transition-colors"
              >
                <User className="h-4 w-4 text-emerald-300" />
                <span>Role: {roles.find(r => r.id === currentRole)?.label.split(' ')[0]}</span>
                <ChevronDown className="h-4 w-4 text-emerald-300" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-1 text-gray-800 border border-gray-200">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setRole(role.id);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-emerald-50 transition-colors block ${
                        currentRole === role.id ? 'bg-emerald-50 text-emerald-700 font-semibold' : ''
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Language Selector Layout (Localization Requirement) */}
            <div className="relative">
              <button 
                onClick={() => { setIsLangDropdownOpen(!isLangDropdownOpen); setIsRoleDropdownOpen(false); }}
                className="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-950 px-3 py-2 rounded-lg text-sm font-medium border border-emerald-600 transition-colors"
              >
                <Globe className="h-4 w-4 text-emerald-300" />
                <span className="uppercase">{currentLang}</span>
                <ChevronDown className="h-4 w-4 text-emerald-300" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 text-gray-800 border border-gray-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLang(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 transition-colors block ${
                        currentLang === lang.code ? 'bg-emerald-50 text-emerald-700 font-semibold' : ''
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Notification Indicator Icon */}
            <button className="relative p-2 text-emerald-100 hover:text-white hover:bg-emerald-800 rounded-full transition-colors focus:outline-none">
              <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-emerald-700"></span>
              <Bell className="h-6 w-6" />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}
