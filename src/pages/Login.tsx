
import React, { useEffect } from 'react';
import { Code } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import { useSearchParams } from 'react-router-dom';

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'sign-in';

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
      
      <AuthForm defaultTab={defaultTab} />
      
      <p className="mt-8 text-white/40 text-sm text-center max-w-md">
        CodeChatter combines competitive coding with social networking to create a unique platform for developers to learn, share, and grow together.
      </p>
    </div>
  );
};

export default Login;
