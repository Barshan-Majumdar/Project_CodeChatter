
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Code, MessageSquare, Users, Star, Zap, Shield, Award, Layers } from 'lucide-react';

const Features = () => {
  const primaryFeatures = [
    {
      icon: Code,
      title: 'Problem Posting & Solving',
      description: 'Create and solve challenging coding problems. Share your solutions, get feedback, and learn different approaches to the same problem.',
      color: 'from-codechatter-blue to-blue-600'
    },
    {
      icon: Star,
      title: 'AI Assistance',
      description: 'Get help from our built-in AI coding assistant. It can explain concepts, debug your code, suggest optimizations, and help you learn new programming techniques.',
      color: 'from-codechatter-neon-green to-green-600'
    },
    {
      icon: MessageSquare,
      title: 'Social Interaction',
      description: 'Connect with fellow coders, follow top performers, comment on solutions, and collaborate on complex problems. Build your network while improving your skills.',
      color: 'from-codechatter-purple to-purple-600'
    },
    {
      icon: Users,
      title: 'Gamification',
      description: 'Earn points for solving problems, helping others, and contributing to the platform. Climb leaderboards and earn badges that showcase your expertise.',
      color: 'from-codechatter-neon-pink to-pink-600'
    }
  ];

  const secondaryFeatures = [
    {
      icon: Zap,
      title: 'Real-time Collaboration',
      description: 'Work on coding problems together in real-time with integrated code editors and chat functionality.'
    },
    {
      icon: Shield,
      title: 'Code Reviews',
      description: 'Request and provide code reviews to improve code quality and learn best practices.'
    },
    {
      icon: Award,
      title: 'Competitions & Challenges',
      description: 'Participate in regular coding competitions and themed challenges with prizes.'
    },
    {
      icon: Layers,
      title: 'Personalized Learning Paths',
      description: 'Follow structured learning paths based on your skill level and interests.'
    }
  ];

  return (
    <div className="min-h-screen bg-codechatter-darker text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features for Modern <span className="text-codechatter-blue">Coders</span>
            </h1>
            <p className="text-white/80 text-lg mb-8">
              CodeChatter combines coding challenges with social networking to create a unique platform where you can solve problems, connect with other programmers, and improve your skills.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-codechatter-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-codechatter-blue/10 rounded-full blur-3xl"></div>
      </section>

      {/* Primary Features */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {primaryFeatures.map((feature, index) => (
              <Card key={index} className="bg-codechatter-dark border-codechatter-blue/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-2 bg-gradient-to-r ${feature.color}"></div>
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center bg-gradient-to-br ${feature.color}`}>
                      <feature.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary Features */}
      <section className="py-16 bg-codechatter-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Additional Features</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryFeatures.map((feature, index) => (
              <div key={index} className="p-6 border border-codechatter-blue/20 rounded-lg hover:border-codechatter-purple/40 transition-all">
                <feature.icon size={24} className="text-codechatter-blue mb-4" />
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How We Compare</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-codechatter-blue/20">
                  <th className="text-left py-4 px-6">Features</th>
                  <th className="text-center py-4 px-6">CodeChatter</th>
                  <th className="text-center py-4 px-6">Traditional Coding Platforms</th>
                  <th className="text-center py-4 px-6">Social Networks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-6">Coding Challenges</td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-codechatter-blue mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-codechatter-blue mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-6">Social Interaction</td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-codechatter-blue mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-codechatter-blue mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-6">AI Assistance</td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-codechatter-blue mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-6">Gamification</td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-codechatter-blue mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-codechatter-blue mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6">Community Focus</td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-codechatter-blue mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-codechatter-blue mx-auto" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
