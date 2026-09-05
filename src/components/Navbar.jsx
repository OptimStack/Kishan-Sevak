import React, { useState } from 'react';
import { Globe, User, Bell, ChevronDown, Moon, Sun, LogOut } from 'lucide-react';

export default function Navbar({ currentRole, setRole, onLogout, currentLang, setLang, isDarkMode, setIsDarkMode }) {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const roles = [
    { id: 'farmer', label: 'Farmer Dashboard (शेतकरी)' },
    { id: 'buyer', label: 'Buyer Marketplace (खरेदीदार)' }
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'hi', label: 'हिन्दी (Hindi)' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#174f46] text-white shadow-md">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2">
          
          {/* Left Side: Brand Logo and Title */}
          <div className="flex min-w-0 items-center gap-2.5 cursor-pointer">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 text-emerald-700 sm:h-10 sm:w-10">
              <img src="/AgroFPO.svg" alt="KrishiSetu logo" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-base font-bold leading-tight tracking-wide sm:text-xl">
                KrishiSetu
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-4">    
            <div className="relative">
              <button 
                onClick={() => { setIsRoleDropdownOpen(!isRoleDropdownOpen); setIsLangDropdownOpen(false); }}
                className="flex items-center gap-1.5 rounded-lg border border-[#3b756b] bg-[#123f39] px-2 py-2 text-xs font-medium transition-colors hover:bg-[#0d302b] sm:gap-2 sm:px-3 sm:text-sm"
              >
                <User className="h-4 w-4 text-emerald-300" />
                <span className="max-w-[62px] truncate sm:max-w-none">{roles.find(r => r.id === currentRole)?.label.split(' ')[0]}</span>
                <ChevronDown className="h-4 w-4 text-emerald-300" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white py-1 text-gray-800 shadow-xl dark:border-emerald-800 dark:bg-[#0d241b] dark:text-slate-100">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setRole(role.id);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950 ${
                        currentRole === role.id ? 'bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : ''
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                  <div className="my-1 border-t border-gray-100 dark:border-emerald-900" />
                  <button
                    type="button"
                    onClick={() => {
                      setIsRoleDropdownOpen(false);
                      onLogout();
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/40"
                  >
                    <LogOut className="h-4 w-4" />
                    {currentLang === 'mr' ? 'लॉग आउट' : currentLang === 'hi' ? 'लॉग आउट' : 'Log out'}
                  </button>
                </div>
              )}
            </div>

            {/* 2. Language Selector Layout (Localization Requirement) */}
            <div className="relative">
              <button 
                onClick={() => { setIsLangDropdownOpen(!isLangDropdownOpen); setIsRoleDropdownOpen(false); }}
                className="flex items-center gap-1.5 rounded-lg border border-[#3b756b] bg-[#123f39] px-2 py-2 text-xs font-medium transition-colors hover:bg-[#0d302b] sm:gap-2 sm:px-3 sm:text-sm"
              >
                <Globe className="h-4 w-4 text-emerald-300" />
                <span className="uppercase">{currentLang}</span>
                <ChevronDown className="h-4 w-4 text-emerald-300" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 text-gray-800 shadow-xl dark:border-emerald-800 dark:bg-[#0d241b] dark:text-slate-100">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLang(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950 ${
                        currentLang === lang.code ? 'bg-emerald-50 font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : ''
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsDarkMode((current) => !current)}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-full p-2 text-emerald-100 transition-colors hover:bg-emerald-800 hover:text-white focus:outline-none"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

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
