import React from 'react';

const Closed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <span className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-2xl">🎨</span>
            <span className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-2xl">📅</span>
            <span className="w-12 h-12 bg-indigo-400 rounded-full flex items-center justify-center text-2xl">👥</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            October Visual Arts Club
          </h1>
          <h2 className="text-3xl font-semibold text-purple-300 mb-6">
            Registration Closed
          </h2>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
            <p className="text-xl text-gray-200 mb-4">
              Thank you for your interest in our bootcamp!
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Registration for the October Visual Arts Club Bootcamp has now closed. 
              We appreciate your enthusiasm and hope to see you at our next event.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-xl p-6">
            <p className="text-2xl font-semibold text-purple-200 mb-2">
              See You Next Year! 🎉
            </p>
            <p className="text-gray-300">
              Stay tuned for announcements about future bootcamps and events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Closed;
