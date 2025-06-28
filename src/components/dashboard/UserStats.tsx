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
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserStats = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        // Get current user's profile ID
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsLoading(false);
          return;
        }

        // Get profile ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', session.user.id)
          .single();

        if (!profile) {
          setIsLoading(false);
          return;
        }

        // Count solved problems
        const { data: solvedProblemsData, error: solvedProblemsError } = await supabase
          .from('solved_problems')
          .select('*')
          .eq('user_id', profile.id);
          
        if (solvedProblemsError) throw solvedProblemsError;
        
        if (solvedProblemsData) {
          setProblemsSolved(solvedProblemsData.length);
          
          // Calculate total points
          const points = solvedProblemsData.reduce((sum, problem) => sum + (problem.points || 0), 0);
          setTotalPoints(points);
          
          // Fetch rank - only if there are solved problems
          if (solvedProblemsData.length > 0) {
            const { data: rankData, error: rankError } = await supabase
              .rpc('get_user_rank', { target_user_id: profile.id });
              
            if (!rankError && rankData !== null) {
              setGlobalRank(String(rankData));
            }
          } else {
            // Reset rank to default when no problems solved
            setGlobalRank('--');
          }
          
          // For streak we would need a more complex calculation based on consecutive days
          // Simplified version for now
          setCurrentStreak(Math.floor(solvedProblemsData.length / 2));
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserStats();
    
    // Set up real-time subscription to update stats when problems are solved
    const channel = supabase
      .channel('solved_problems_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'solved_problems'
        },
        () => {
          fetchUserStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  if (isLoading) {
    return (
      <div className="bg-codechatter-dark rounded-lg border border-codechatter-blue/20 p-4">
        <div className="grid grid-cols-4 gap-4 text-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3">
              <div className="animate-pulse">
                <div className="h-8 bg-codechatter-darker rounded mb-2"></div>
                <div className="h-4 bg-codechatter-darker rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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