
import React from 'react';

const UserStats: React.FC = () => {
  return (
    <div className="bg-codechatter-dark rounded-lg border border-codechatter-blue/20 p-4">
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="p-3">
          <p className="text-white/60 text-sm">Problems Solved</p>
          <p className="text-2xl font-bold text-codechatter-blue mt-1">0</p>
        </div>
        <div className="p-3 border-l border-codechatter-blue/20">
          <p className="text-white/60 text-sm">Current Streak</p>
          <p className="text-2xl font-bold text-codechatter-purple mt-1">0 days</p>
        </div>
        <div className="p-3 border-l border-codechatter-blue/20">
          <p className="text-white/60 text-sm">Total Points</p>
          <p className="text-2xl font-bold text-green-400 mt-1">0</p>
        </div>
        <div className="p-3 border-l border-codechatter-blue/20">
          <p className="text-white/60 text-sm">Global Rank</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">--</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
