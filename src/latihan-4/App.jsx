import { useState } from 'react';
import GuestView from './GuestView';
import AdminView from './AdminView';

const App = () => {
  const [view, setView] = useState('guest');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#FFF4E0] dark:bg-[#1A1A1D] text-black dark:text-white transition-colors duration-300 font-sans">

        {/* Header / Navigation */}
        <header className="border-b-4 border-black dark:border-white bg-[#FF6B6B] dark:bg-[#C3073F] p-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider">
            Fauzan Library
          </h1>

          <div className="flex gap-4 items-center">
            {/* View Toggle */}
            <div className="flex bg-[#FFE66D] dark:bg-[#4E4E50] border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <button
                onClick={() => setView('guest')}
                className={`px-4 py-2 font-black uppercase border-r-4 border-black dark:border-white transition-all ${view === 'guest'
                  ? 'bg-[#4ECDC4] dark:bg-[#950740] text-black dark:text-white'
                  : 'hover:bg-[#4ECDC4]/50 dark:hover:bg-[#950740]/50 text-black dark:text-white'
                  }`}
              >
                Guest
              </button>
              <button
                onClick={() => setView('admin')}
                className={`px-4 py-2 font-black uppercase transition-all ${view === 'admin'
                  ? 'bg-[#4ECDC4] dark:bg-[#950740] text-black dark:text-white'
                  : 'hover:bg-[#4ECDC4]/50 dark:hover:bg-[#950740]/50 text-black dark:text-white'
                  }`}
              >
                Admin
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-8">
          {view === 'guest' ? <GuestView darkMode={darkMode} /> : <AdminView darkMode={darkMode} />}
        </main>
      </div>
    </div>
  );
};

export default App;