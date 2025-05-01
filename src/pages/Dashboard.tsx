
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProblemCard from '@/components/dashboard/ProblemCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import LeaderboardTable from '@/components/dashboard/LeaderboardTable';
import ChatBox from '@/components/dashboard/ChatBox';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Automatically redirect to the home dashboard view
  useEffect(() => {
    navigate('/dashboard/home');
  }, [navigate]);

  // This component is basically just a redirector now
  return <div className="p-6">Redirecting to dashboard home...</div>;
};

export default Dashboard;
