import React, { useState, useEffect } from 'react';
import LockScreen from './components/LockScreen';
import FunnyGame from './components/FunnyGame';
import LoveRevelation from './components/LoveRevelation';

function App() {
  const [screen, setScreen] = useState('lock'); // 'lock', 'game', 'love'
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if there's a stored token
    const storedToken = localStorage.getItem('hiaToken');
    if (storedToken) {
      setToken(storedToken);
      setScreen('game');
    }
  }, []);

  const handleUnlock = async (answer) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('hiaToken', data.token);
        setToken(data.token);
        setScreen('game');
      } else {
        alert(data.message || 'Wrong answer! Try again!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Connection error. Make sure backend is running!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGameComplete = () => {
    setScreen('love');
  };

  const handleRestart = () => {
    localStorage.removeItem('hiaToken');
    setToken(null);
    setScreen('lock');
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
      {screen === 'lock' && (
        <LockScreen onUnlock={handleUnlock} isLoading={isLoading} />
      )}
      {screen === 'game' && token && (
        <FunnyGame onGameComplete={handleGameComplete} onRestart={handleRestart} />
      )}
      {screen === 'love' && token && (
        <LoveRevelation token={token} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
