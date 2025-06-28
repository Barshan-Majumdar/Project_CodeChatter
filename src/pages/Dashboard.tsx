import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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