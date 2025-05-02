
import React from 'react';
import { Code, MessageSquare, Users, Star, Terminal, Award, Shield, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FeatureSection: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center p-6 rounded-lg bg-codechatter-dark border border-codechatter-blue/20">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-codechatter-blue to-codechatter-purple flex items-center justify-center text-white">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  </div>
);

const LearnMore: React.FC = () => {
  return (
    <div className="min-h-screen bg-codechatter-darker text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 mt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-codechatter-blue via-codechatter-purple to-codechatter-neon-green">
            Discover CodeChatter's Features
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            CodeChatter combines the best aspects of coding challenges, social networking, and AI assistance to create a unique platform for developers.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Core Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureSection
                icon={<Code size={24} />}
                title="Coding Challenges"
                description="Access a vast library of coding problems ranging from beginner to expert level. Practice algorithms, data structures, and problem-solving techniques in a variety of programming languages."
              />
              <FeatureSection
                icon={<Users size={24} />}
                title="Developer Community"
                description="Connect with like-minded developers, follow their progress, share your solutions, and engage in meaningful discussions about coding concepts and approaches."
              />
              <FeatureSection
                icon={<MessageSquare size={24} />}
                title="Code Discussions"
                description="Participate in threaded discussions about specific problems or solutions. Get feedback on your code from peers and provide insights to help others improve."
              />
              <FeatureSection
                icon={<Star size={24} />}
                title="AI-Powered Assistance"
                description="Get instant help and code optimization suggestions from our AI assistant when you're stuck on a problem or want to improve your solution."
              />
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Learning & Growth</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureSection
                icon={<Terminal size={24} />}
                title="Interactive Code Editor"
                description="Code directly in our platform with syntax highlighting, auto-completion, and real-time error checking. Test your solutions against various test cases without leaving the site."
              />
              <FeatureSection
                icon={<Award size={24} />}
                title="Gamified Learning"
                description="Earn points, badges, and climb the leaderboard as you solve problems and contribute to the community. Track your progress and showcase your accomplishments on your profile."
              />
              <FeatureSection
                icon={<Shield size={24} />}
                title="Interview Preparation"
                description="Prepare for technical interviews with curated problem sets that mirror common interview questions from top tech companies. Practice under timed conditions to simulate real interviews."
              />
              <FeatureSection
                icon={<Activity size={24} />}
                title="Performance Analytics"
                description="Monitor your performance and growth with detailed analytics. Identify your strengths and areas for improvement based on problem categories and difficulty levels."
              />
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LearnMore;
