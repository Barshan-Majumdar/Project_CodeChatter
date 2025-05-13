
import React, { useEffect } from 'react';
import { Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  // Automatically redirect to dashboard without authentication
  useEffect(() => {
    navigate('/dashboard/home');
  }, [navigate]);

  return (
    <div className="bg-codechatter-darker min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <Code size={32} className="text-codechatter-blue mr-2" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-codechatter-blue to-codechatter-purple bg-clip-text text-transparent">
            CodeChatter
          </h1>
        </div>
        <p className="text-white/60">Code. Connect. Compete.</p>
      </div>
      
      <div className="text-white text-center">
        <div className="animate-spin h-8 w-8 border-4 border-t-codechatter-purple border-codechatter-blue/30 rounded-full mx-auto mb-4"></div>
        <p>Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default Login;
