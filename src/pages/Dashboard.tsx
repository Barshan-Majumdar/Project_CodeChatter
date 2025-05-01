
import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import ProblemCard from '@/components/dashboard/ProblemCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import LeaderboardTable from '@/components/dashboard/LeaderboardTable';
import ChatBox from '@/components/dashboard/ChatBox';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const featuredProblems = [
    {
      title: "Binary Search Tree Validator",
      difficulty: "Medium" as const,
      points: 50,
      tags: ["Data Structure", "Trees", "Recursion"],
      solvedBy: 245
    },
    {
      title: "Two Sum",
      difficulty: "Easy" as const,
      points: 20,
      tags: ["Arrays", "Hash Table"],
      solvedBy: 1204
    },
    {
      title: "Dynamic Programming Challenge",
      difficulty: "Hard" as const,
      points: 100,
      tags: ["DP", "Algorithms", "Optimization"],
      solvedBy: 128
    },
    {
      title: "Linked List Cycle Detection",
      difficulty: "Medium" as const,
      points: 45,
      tags: ["Data Structure", "Linked Lists", "Two Pointers"],
      solvedBy: 387
    }
  ];

  return (
    <div className="flex h-screen bg-codechatter-darker text-white overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Welcome back, John!</h1>
              <Button
                className="bg-codechatter-dark hover:bg-codechatter-purple/20 border border-codechatter-blue/20"
              >
                <Code size={18} className="mr-2" /> New Challenge
              </Button>
            </div>
            <p className="text-white/60">Let's solve some problems today.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              {/* User stats */}
              <div className="bg-codechatter-dark rounded-lg border border-codechatter-blue/20 p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3">
                    <p className="text-white/60 text-sm">Problems Solved</p>
                    <p className="text-2xl font-bold text-codechatter-blue mt-1">37</p>
                  </div>
                  <div className="p-3 border-l border-r border-codechatter-blue/20">
                    <p className="text-white/60 text-sm">Current Streak</p>
                    <p className="text-2xl font-bold text-codechatter-purple mt-1">5 days</p>
                  </div>
                  <div className="p-3">
                    <p className="text-white/60 text-sm">Total Points</p>
                    <p className="text-2xl font-bold text-green-400 mt-1">920</p>
                  </div>
                </div>
              </div>

              {/* Featured Problems */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Featured Problems</h2>
                  <Button variant="link" className="text-codechatter-blue hover:text-codechatter-purple">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredProblems.map((problem, index) => (
                    <ProblemCard 
                      key={index} 
                      title={problem.title}
                      difficulty={problem.difficulty}
                      points={problem.points}
                      tags={problem.tags}
                      solvedBy={problem.solvedBy}
                    />
                  ))}
                </div>
              </div>

              {/* Leaderboard */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Leaderboard</h2>
                  <Button variant="link" className="text-codechatter-blue hover:text-codechatter-purple">
                    View Full
                  </Button>
                </div>
                <LeaderboardTable />
              </div>
            </div>

            <div className="space-y-6">
              {/* Activity Feed */}
              <ActivityFeed />
              
              {/* AI Chat Assistant */}
              <ChatBox />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
