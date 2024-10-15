import React, { useState, useEffect } from 'react';
import InteractiveMap from './components/InteractiveMap';
import DataEntryPanel from './components/DataEntryPanel';
import RealTimeTable from './components/RealTimeTable';
import ExportButtons from './components/ExportButtons';
import StatisticsChart from './components/StatisticsChart';
import PlayerManagement from './components/PlayerManagement';
import { Play } from './types';

function App() {
  const [plays, setPlays] = useState<Play[]>([]);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState<'stats' | 'players'>('stats');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addPlay = (play: Play) => {
    setPlays([...plays, play]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Football Statistics Tracker</h1>
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setCurrentPage('stats')}
          className={`p-2 rounded ${currentPage === 'stats' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Statistics
        </button>
        <button
          onClick={() => setCurrentPage('players')}
          className={`p-2 rounded ${currentPage === 'players' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Manage Players
        </button>
      </div>
      {currentPage === 'stats' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {isMobile ? (
              <DataEntryPanel addPlay={addPlay} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isMobile={isMobile} />
            ) : (
              <InteractiveMap selectedZone={selectedZone} setSelectedZone={setSelectedZone} />
            )}
          </div>
          <div>
            <DataEntryPanel addPlay={addPlay} selectedZone={selectedZone} setSelectedZone={setSelectedZone} isMobile={isMobile} />
            <RealTimeTable plays={plays} />
            <ExportButtons plays={plays} />
            <StatisticsChart plays={plays} />
          </div>
        </div>
      ) : (
        <PlayerManagement />
      )}
    </div>
  );
}

export default App;