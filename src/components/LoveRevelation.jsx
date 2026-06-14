import React, { useState, useEffect } from 'react';
import { Heart, ChevronDown } from 'lucide-react';

const LoveRevelation = ({ token, onRestart }) => {
  const [reasons, setReasons] = useState([]);
  const [revealedReasons, setRevealedReasons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allRevealed, setAllRevealed] = useState(false);

  useEffect(() => {
    fetchLoveReasons();
  }, []);

  const fetchLoveReasons = async () => {
    try {
      const response = await fetch('/api/love-reasons', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setReasons(data.reasons);
      } else {
        // Fallback hardcoded reasons
        setReasons([
          "Your smile is my favorite thing in the entire world",
          "The way you get angry about tiny things is absolutely adorable",
          "Your laugh is contagious and makes even my worst days better",
          "You're the strongest person I know, yet so tender-hearted",
          "Your kindness to others shows me what a beautiful soul you have",
          "The way you care about people you love is inspiring",
          "Your creativity and imagination amaze me every single day",
          "You make me want to be a better version of myself",
          "Your presence is my safe place, my home",
          "Loving you is the easiest and best decision I've ever made"
        ]);
      }
    } catch (error) {
      console.error('Error fetching reasons:', error);
      // Fallback
      setReasons([
        "Your smile is my favorite thing in the entire world",
        "The way you get angry about tiny things is absolutely adorable",
        "Your laugh is contagious and makes even my worst days better",
        "You're the strongest person I know, yet so tender-hearted",
        "Your kindness to others shows me what a beautiful soul you have",
        "The way you care about people you love is inspiring",
        "Your creativity and imagination amaze me every single day",
        "You make me want to be a better version of myself",
        "Your presence is my safe place, my home",
        "Loving you is the easiest and best decision I've ever made"
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const revealReason = (index) => {
    if (!revealedReasons.includes(index)) {
      const newRevealed = [...revealedReasons, index];
      setRevealedReasons(newRevealed);

      if (newRevealed.length === reasons.length) {
        setAllRevealed(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 via-pink-200 to-purple-300 py-12 px-4">
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-heart text-red-400 text-6xl"
            style={{
              left: Math.random() * 100 + '%',
              animationDelay: i * 0.6 + 's',
              animationDuration: (7 + i * 0.3) + 's'
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
            💌 Raisa Islam Hia 💌
          </h1>
          <p className="text-xl md:text-2xl text-white drop-shadow-md mb-2 font-semibold">
            10 Reasons Why I Love You
          </p>
          <p className="text-lg text-white/90 drop-shadow-md">
            From your one and only, Ahanaf Hasan Rivan 💕
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center">
            <div className="inline-block">
              <div className="animate-spin">
                <Heart size={64} className="text-white" />
              </div>
              <p className="text-white text-xl mt-4 font-semibold">Loading my feelings...</p>
            </div>
          </div>
        )}

        {/* Reasons List */}
        {!isLoading && (
          <div className="space-y-4 mb-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
                onClick={() => revealReason(index)}
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 flex items-center justify-between">
                  <span className="text-2xl font-bold">Reason #{index + 1}</span>
                  <Heart size={28} fill="white" className={`transition-all ${revealedReasons.includes(index) ? 'scale-125' : ''}`} />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  {revealedReasons.includes(index) ? (
                    <p className="text-lg text-gray-800 font-semibold leading-relaxed animate-fadeIn">
                      {reason}
                    </p>
                  ) : (
                    <div className="flex items-center justify-center py-6">
                      <p className="text-gray-500 font-semibold flex items-center gap-2">
                        <ChevronDown size={20} className="animate-bounce" />
                        Click to reveal
                        <ChevronDown size={20} className="animate-bounce" />
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Final Message */}
        {allRevealed && !isLoading && (
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white mb-8 animate-pulse">
            <p className="text-4xl mb-4">💕 💕 💕</p>
            <p className="text-2xl md:text-3xl font-bold mb-4">
              I could go on forever, but I hope this gives you a glimpse of how much you mean to me.
            </p>
            <p className="text-lg md:text-xl mb-6">
              Every moment with you is a blessing. Every time you smile, the world becomes a better place. Every time you laugh, my heart skips a beat.
            </p>
            <p className="text-2xl font-bold">
              I'm sorry for making you angry. You're too precious to me. 🥺
            </p>
            <p className="text-3xl mt-6">
              Always yours, ❤️ Rivan
            </p>
          </div>
        )}

        {/* Progress Indicator */}
        {!isLoading && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white font-bold text-lg drop-shadow-md">
                Revealed: {revealedReasons.length}/{reasons.length}
              </p>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-400 to-red-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${(revealedReasons.length / reasons.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!isLoading && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRestart}
              className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl shadow-lg hover:scale-110 transition-all transform active:scale-95"
            >
              🔄 Start Over
            </button>
            <button
              onClick={() => {
                const message = `I love you so much! ❤️\n\nThe ${revealedReasons.length} reasons Rivan loves me:\n${reasons.map((r, i) => `${i + 1}. ${r}`).join('\n')}`;
                navigator.share ? navigator.share({ text: message }) : alert('Message:\n' + message);
              }}
              className="px-8 py-4 bg-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-110 transition-all transform active:scale-95"
            >
              📱 Share This
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveRevelation;
