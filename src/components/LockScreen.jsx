import React, { useState } from 'react';
import { Heart, Lock } from 'lucide-react';

const LockScreen = ({ onUnlock, isLoading }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      setError('Please enter an answer!');
      return;
    }
    setError('');
    onUnlock(answer);
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="floating-heart text-red-400 text-4xl"
            style={{
              left: Math.random() * 100 + '%',
              animationDelay: i * 1.2 + 's',
              animationDuration: (5 + i) + 's'
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-md w-full">
        {/* Lock Icon Animation */}
        <div className="text-center mb-8 animate-bounce">
          <div className="inline-block p-6 bg-white rounded-full shadow-2xl">
            <Lock size={64} className="text-pink-500" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            ✨ Raisa Islam Hia ✨
          </h1>
          <p className="text-xl text-white/80 drop-shadow-md font-semibold">
            Only You Can Enter
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-white/95">
          {/* Subtitle */}
          <p className="text-center text-gray-600 mb-6 font-medium">
            Answer a question only you would know...
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Question Display */}
            <div className="mb-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl border-2 border-pink-300">
              <p className="text-lg font-bold text-gray-800 text-center">
                🤔 What's your favorite thing about Rivan?
              </p>
              <p className="text-sm text-gray-600 text-center mt-2">
                (Hint: It's something that makes you smile)
              </p>
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={answer}
              onChange={handleChange}
              placeholder="Type your answer here..."
              className="w-full px-4 py-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-700 placeholder-gray-400"
              disabled={isLoading}
              autoFocus
            />

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-4 font-semibold text-center">
                ❌ {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                '💕 Unlock My Heart'
              )}
            </button>
          </form>

          {/* Footer Message */}
          <p className="text-center text-gray-500 text-xs mt-6 leading-relaxed">
            🔐 This page is only for Raisa. <br />
            Made with love by <span className="font-bold text-pink-600">Ahanaf Hasan Rivan</span>
          </p>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-white mt-8 text-sm drop-shadow-md">
          Once you enter, a special surprise awaits... 🎁
        </p>
      </div>
    </div>
  );
};

export default LockScreen;
