import React, { useState, useRef, useEffect } from 'react';
import { Heart, Zap } from 'lucide-react';

const FunnyGame = ({ onGameComplete, onRestart }) => {
  const [happiness, setHappiness] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [gamePhase, setGamePhase] = useState('normal'); // 'normal', 'button_escape', 'victory'
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [escapeAttempts, setEscapeAttempts] = useState(0);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  // Target: 100 happiness (or 10 clicks in button escape mode)
  const TARGET_HAPPINESS = 100;
  const CLICK_INCREMENT = 10;

  // Start with button escape mode for fun
  useEffect(() => {
    setGamePhase('button_escape');
  }, []);

  const moveButton = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const randomX = Math.random() * (rect.width - 150);
    const randomY = Math.random() * (rect.height - 60);

    setButtonPos({ x: randomX, y: randomY });
    setEscapeAttempts(prev => prev + 1);

    // After 3 failed attempts, make button fill screen
    if (escapeAttempts >= 5) {
      setGamePhase('give_up');
    }
  };

  const handleButtonHover = () => {
    if (gamePhase === 'button_escape') {
      moveButton();
    }
  };

  const handleAcceptClick = () => {
    if (gamePhase === 'button_escape' || gamePhase === 'give_up') {
      const newHappiness = Math.min(happiness + CLICK_INCREMENT, TARGET_HAPPINESS);
      setHappiness(newHappiness);
      setClicks(clicks + 1);

      if (newHappiness >= TARGET_HAPPINESS) {
        setGamePhase('victory');
        setTimeout(onGameComplete, 1500);
      } else if (escapeAttempts < 3) {
        // Keep trying to escape
        moveButton();
      } else {
        // Switch to regular clicking
        setGamePhase('normal');
      }
    } else if (gamePhase === 'normal') {
      const newHappiness = Math.min(happiness + CLICK_INCREMENT, TARGET_HAPPINESS);
      setHappiness(newHappiness);
      setClicks(clicks + 1);

      if (newHappiness >= TARGET_HAPPINESS) {
        setGamePhase('victory');
        setTimeout(onGameComplete, 1500);
      }
    }
  };

  const happinessPercentage = (happiness / TARGET_HAPPINESS) * 100;

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300"
    >
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-heart text-red-400 text-5xl"
            style={{
              left: Math.random() * 100 + '%',
              animationDelay: i * 0.8 + 's',
              animationDuration: (6 + i * 0.5) + 's'
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 drop-shadow-lg mb-2">
            💪 Make Hia Smile! 😄
          </h1>
          <p className="text-lg text-gray-700 font-semibold">
            {gamePhase === 'button_escape' && "Try to accept Rivan's apology... 😏 (Good luck!)"}
            {gamePhase === 'give_up' && "You can't escape LOVE! 💕"}
            {gamePhase === 'normal' && "Keep clicking to fill the happiness meter!"}
          </p>
        </div>

        {/* Happiness Meter */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-gray-800">Hia's Happiness Meter</span>
            <span className="text-2xl font-bold text-pink-600">{Math.round(happinessPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden shadow-md">
            <div
              className="bg-gradient-to-r from-pink-400 to-red-500 h-full flex items-center justify-center transition-all duration-500 ease-out"
              style={{ width: `${happinessPercentage}%` }}
            >
              {happinessPercentage > 20 && (
                <span className="text-white font-bold text-sm">💕</span>
              )}
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm mt-3">
            Clicks: {clicks} | Happiness: {happiness}/{TARGET_HAPPINESS}
          </p>
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8 relative min-h-96 flex flex-col items-center justify-center">
          {/* Animated Hia Avatar */}
          <div className="mb-8 relative">
            <div className={`text-9xl transition-all duration-300 ${
              happiness < 33 ? 'animate-bounce' :
              happiness < 66 ? 'scale-110' :
              'scale-125'
            }`}>
              {happiness < 33 && '😠'}
              {happiness >= 33 && happiness < 66 && '😒'}
              {happiness >= 66 && happiness < 100 && '🙂'}
              {happiness >= 100 && '😍'}
            </div>
            {happiness > 50 && (
              <div className="text-4xl absolute -top-6 -right-6 animate-spin">✨</div>
            )}
          </div>

          {/* Button - Escaping or Normal */}
          {gamePhase === 'button_escape' && (
            <button
              ref={buttonRef}
              onMouseEnter={handleButtonHover}
              onClick={handleAcceptClick}
              style={{
                position: 'absolute',
                left: `${buttonPos.x}px`,
                top: `${buttonPos.y}px`,
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:scale-110 transition-all transform active:scale-95 shadow-lg"
            >
              🤝 Accept Apology
            </button>
          )}

          {/* Full Screen Button */}
          {gamePhase === 'give_up' && (
            <button
              onClick={handleAcceptClick}
              className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white text-5xl font-bold hover:scale-105 transition-all z-50 cursor-pointer"
            >
              <div className="text-center">
                <p className="mb-4">💕 You can't escape! 💕</p>
                <p className="text-3xl">Click to Accept!</p>
              </div>
            </button>
          )}

          {/* Normal Click Button */}
          {gamePhase === 'normal' && (
            <button
              onClick={handleAcceptClick}
              className="px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-2xl rounded-2xl hover:scale-110 transition-all transform active:scale-95 shadow-lg"
            >
              💪 Click to Make Her Smile!
            </button>
          )}

          {/* Victory Screen */}
          {gamePhase === 'victory' && (
            <div className="text-center">
              <p className="text-5xl mb-4">🎉 🎊 🎉</p>
              <p className="text-3xl font-bold text-pink-600 mb-4">
                You've won her heart again! 💕
              </p>
              <p className="text-lg text-gray-600">
                Transitioning to something special...
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        {(gamePhase === 'button_escape' || gamePhase === 'give_up') && (
          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-6 text-center">
            <p className="text-gray-800 font-semibold">
              😄 Try to click the button... if you can catch it! 😄
            </p>
          </div>
        )}

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="text-gray-600 hover:text-gray-800 font-semibold text-sm underline"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunnyGame;
