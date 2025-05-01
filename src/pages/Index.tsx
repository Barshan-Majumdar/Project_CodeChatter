
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Code, MessageSquare, Users, Star
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CodeRain from '@/components/CodeRain';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';

const Index = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Animation for counting up stats
  useEffect(() => {
    const stats = statsRef.current?.querySelectorAll('.stat-number');
    if (!stats) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat) => {
              const target = parseInt(stat.getAttribute('data-target') || '0', 10);
              let count = 0;
              const updateCount = () => {
                const increment = target / 50;
                if (count < target) {
                  count += increment;
                  (stat as HTMLElement).innerText = Math.ceil(count).toString();
                  requestAnimationFrame(updateCount);
                } else {
                  (stat as HTMLElement).innerText = target.toString();
                }
              };
              updateCount();
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-codechatter-darker text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <CodeRain />
        <div className="container mx-auto px-4 pt-16 pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-codechatter-blue via-codechatter-purple to-codechatter-neon-green">
                Code. Connect. Compete.
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                A social coding platform to post problems, solve challenges, connect with coders, and earn points—all with AI assistance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90 text-white px-8 py-6 text-lg"
                  asChild
                >
                  <Link to="/dashboard">
                    Get Started
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-codechatter-blue text-codechatter-blue hover:bg-codechatter-blue/10 px-8 py-6 text-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Hero image/mockup */}
            <div className="relative">
              <div className="relative bg-codechatter-dark/50 backdrop-blur-sm border border-codechatter-blue/20 rounded-xl p-4 shadow-lg animate-float">
                <div className="bg-codechatter-dark rounded-lg p-3 border border-codechatter-blue/20">
                  <div className="flex items-center mb-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 bg-codechatter-darker px-4 py-1 rounded text-xs text-white/70 flex-1 text-center">
                      fibonacci_challenge.py
                    </div>
                  </div>
                  <pre className="bg-codechatter-darker rounded p-4 text-sm code-text">
                    <code className="text-white">
                      <span className="text-codechatter-purple">def</span> <span className="text-codechatter-blue">fibonacci</span>(n):
                      {"\n"}{"  "}<span className="text-codechatter-purple">if</span> n <span className="text-white">&lt;=</span> <span className="text-green-400">1</span>:
                      {"\n"}{"    "}<span className="text-codechatter-purple">return</span> n
                      {"\n"}{"  "}<span className="text-codechatter-purple">else</span>:
                      {"\n"}{"    "}<span className="text-codechatter-purple">return</span> fibonacci(n-<span className="text-green-400">1</span>) + fibonacci(n-<span className="text-green-400">2</span>)
                      {"\n"}{"\n"}<span className="text-gray-500"># Let's optimize with memoization</span>
                      {"\n"}<span className="text-codechatter-purple">def</span> <span className="text-codechatter-blue">memoized_fibonacci</span>(n, memo={}):
                      {"\n"}{"  "}<span className="text-codechatter-purple">if</span> n <span className="text-white">in</span> memo:
                      {"\n"}{"    "}<span className="text-codechatter-purple">return</span> memo[n]
                      {"\n"}{"  "}<span className="text-codechatter-purple">if</span> n <span className="text-white">&lt;=</span> <span className="text-green-400">1</span>:
                      {"\n"}{"    "}<span className="text-codechatter-purple">return</span> n
                      {"\n"}{"  "}memo[n] = memoized_fibonacci(n-<span className="text-green-400">1</span>, memo) + memoized_fibonacci(n-<span className="text-green-400">2</span>, memo)
                      {"\n"}{"  "}<span className="text-codechatter-purple">return</span> memo[n]
                    </code>
                  </pre>
                </div>

                {/* Social interaction mockup */}
                <div className="mt-4 bg-codechatter-dark rounded-lg p-3 border border-codechatter-blue/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-codechatter-blue to-codechatter-purple flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">Sarah K.</h4>
                        <span className="text-xs text-white/60">2m ago</span>
                      </div>
                      <p className="text-sm text-white/80 mt-1">
                        Great optimization! You can reduce the time complexity from O(2^n) to O(n) with memoization.
                      </p>
                      <div className="flex space-x-4 mt-2">
                        <button className="text-white/60 hover:text-codechatter-blue text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                          </svg>
                          12
                        </button>
                        <button className="text-white/60 hover:text-codechatter-purple text-xs flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                          </svg>
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-codechatter-purple/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-codechatter-blue/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-codechatter-neon-green/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-codechatter-blue/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-codechatter-darker to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="bg-codechatter-dark py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 border border-codechatter-blue/20 rounded-lg">
              <div className="text-4xl font-bold text-codechatter-blue mb-2 stat-number" data-target="500">0</div>
              <div className="text-white/80">Active Coders</div>
            </div>
            <div className="text-center p-6 border border-codechatter-blue/20 rounded-lg">
              <div className="text-4xl font-bold text-codechatter-blue mb-2 stat-number" data-target="1000">0</div>
              <div className="text-white/80">Problems Solved</div>
            </div>
            <div className="text-center p-6 border border-codechatter-blue/20 rounded-lg">
              <div className="text-4xl font-bold text-codechatter-blue mb-2 stat-number" data-target="250">0</div>
              <div className="text-white/80">Challenges Posted</div>
            </div>
            <div className="text-center p-6 border border-codechatter-blue/20 rounded-lg">
              <div className="text-4xl font-bold text-codechatter-blue mb-2 stat-number" data-target="50">0</div>
              <div className="text-white/80">Daily Competitions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Elevate Your <span className="text-codechatter-blue">Coding</span> Experience
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              CodeChatter combines the best aspects of coding challenges and social networking,
              creating a unique platform for coders to learn, compete, and connect.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Code}
              title="Problem Solving"
              description="Tackle a wide range of coding challenges, from beginner-friendly to advanced algorithms and data structures."
            />
            <FeatureCard
              icon={Star}
              title="AI Assistance"
              description="Get instant help from our AI assistant when you're stuck or want to optimize your solution."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Social Interaction"
              description="Share your solutions, comment on others' code, and connect with like-minded programmers."
            />
            <FeatureCard
              icon={Users}
              title="Gamification"
              description="Earn points, badges, and climb the leaderboard as you solve more problems and help others."
            />
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-circuit opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-circuit opacity-5"></div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-codechatter-dark relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-codechatter-purple">Community</span> Says
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Join thousands of coders who are already learning, growing, and connecting on CodeChatter.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              content="CodeChatter has completely transformed how I approach coding problems. The social aspect keeps me motivated, and the AI assistant has helped me optimize my solutions numerous times."
              name="Alex Chen"
              title="Software Engineer"
            />
            <TestimonialCard
              content="As someone learning to code, I was intimidated by traditional platforms. CodeChatter's community is supportive and the gamification makes learning fun!"
              name="Mia Johnson"
              title="Computer Science Student"
            />
            <TestimonialCard
              content="I've been using CodeChatter to prepare for technical interviews, and it's been a game-changer. The variety of problems and the ability to see different approaches has broadened my thinking."
              name="David Wong"
              title="Frontend Developer"
            />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-codechatter-purple/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-10 w-20 h-20 bg-codechatter-blue/20 rounded-full blur-2xl"></div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-codechatter-blue/20 to-codechatter-purple/20 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join the Community?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Start coding, connecting, and competing today. Sign up for CodeChatter and take your programming skills to the next level.
              </p>
              <Button
                className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90 text-white px-8 py-6 text-lg"
                asChild
              >
                <Link to="/dashboard">
                  Join the Beta
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-codechatter-blue/5 blur-3xl"></div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
