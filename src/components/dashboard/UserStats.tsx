
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserStatsProps {
  userId?: string;
}

const UserStats: React.FC<UserStatsProps> = ({ userId }) => {
  const [problemsSolved, setProblemsSolved] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [globalRank, setGlobalRank] = useState<string>('--');
  
  useEffect(() => {
    if (userId) {
      // Fetch user statistics from solved_problems table
      const fetchUserStats = async () => {
        try {
          // Count solved problems
          const { data: solvedProblemsData, error: solvedProblemsError } = await supabase
            .from('solved_problems')
            .select('*')
            .eq('user_id', userId);
            
          if (solvedProblemsError) throw solvedProblemsError;
          
          if (solvedProblemsData) {
            setProblemsSolved(solvedProblemsData.length);
            
            // Calculate total points
            const points = solvedProblemsData.reduce((sum, problem) => sum + (problem.points || 0), 0);
            setTotalPoints(points);
            
            // Fetch rank (this would be a more complex query in production)
            const { data: rankData, error: rankError } = await supabase
              .rpc('get_user_rank', { user_id: userId });
              
            if (!rankError && rankData) {
              setGlobalRank(rankData.toString());
            }
            
            // For streak we would need a more complex calculation based on consecutive days
            // Simplified version for now
            setCurrentStreak(Math.floor(solvedProblemsData.length / 2));
          }
        } catch (error) {
          console.error('Error fetching user stats:', error);
        }
      };
      
      fetchUserStats();
    }
  }, [userId]);

  return (
    <div className="bg-codechatter-dark rounded-lg border border-codechatter-blue/20 p-4">
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="p-3">
          <p className="text-white/60 text-sm">Problems Solved</p>
          <p className="text-2xl font-bold text-codechatter-blue mt-1">{problemsSolved}</p>
        </div>
        <div className="p-3 border-l border-codechatter-blue/20">
          <p className="text-white/60 text-sm">Current Streak</p>
          <p className="text-2xl font-bold text-codechatter-purple mt-1">{currentStreak} days</p>
        </div>
        <div className="p-3 border-l border-codechatter-blue/20">
          <p className="text-white/60 text-sm">Total Points</p>
          <p className="text-2xl font-bold text-green-400 mt-1">{totalPoints}</p>
        </div>
        <div className="p-3 border-l border-codechatter-blue/20">
          <p className="text-white/60 text-sm">Global Rank</p>
          <p className="text-2xl font-bold text-yellow-400 mt-1">{globalRank}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
