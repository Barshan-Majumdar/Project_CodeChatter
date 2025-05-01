
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-codechatter-darker text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-codechatter-blue">CodeChatter</span>
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Building the future of social coding
            </p>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-codechatter-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-codechatter-blue/10 rounded-full blur-3xl"></div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-white/80 text-lg mb-6">
                CodeChatter was built with a simple yet powerful mission: to revolutionize coding through community and AI. We believe that coding is not just a solitary activity but a social experience where coders can learn from each other, share knowledge, and grow together.
              </p>
              <p className="text-white/80 text-lg">
                By combining the best aspects of coding challenge platforms with social networking features, all enhanced by cutting-edge AI assistance, we're creating a unique ecosystem where programmers at all levels can thrive.
              </p>
            </div>
            <div className="relative">
              <div className="bg-codechatter-dark border border-codechatter-blue/20 rounded-lg p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-codechatter-blue">Our Vision</h3>
                <p className="text-white/80 mb-6">
                  A world where coding is collaborative, social, and accessible to everyone, powered by AI assistance that helps coders overcome challenges and reach their full potential.
                </p>
                <h3 className="text-2xl font-bold mb-4 text-codechatter-purple">Our Values</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-codechatter-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Community-driven learning and growth</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-codechatter-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Innovation through collaboration</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-codechatter-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Inclusivity and accessibility for coders of all levels</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-codechatter-blue mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ethical and responsible use of AI technology</span>
                  </li>
                </ul>
              </div>
              <div className="absolute top-4 left-4 w-full h-full bg-gradient-to-br from-codechatter-blue/20 to-codechatter-purple/20 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-codechatter-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Team</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Built by passionate coders for the INCEPTRIX Hackathon 2025 at Jain University
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-codechatter-darker border border-codechatter-blue/20 rounded-lg p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-codechatter-blue to-codechatter-purple mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">TM</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Team Member {i}</h3>
                <p className="text-white/60 mb-4">Role / Specialty</p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-white/60 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="#" className="text-white/60 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCEPTRIX Hackathon Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-codechatter-blue/10 to-codechatter-purple/10 rounded-lg p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">INCEPTRIX Hackathon 2025</h2>
              <p className="text-white/80 text-lg mb-6">
                CodeChatter is proudly created for the INCEPTRIX Hackathon 2025 at Jain University. This annual hackathon brings together the brightest minds to create innovative solutions for real-world problems.
              </p>
              <p className="text-white/80 text-lg mb-8">
                Our team came together with a shared vision of revolutionizing how coders connect, learn, and grow together. The hackathon provided the perfect opportunity to transform this vision into reality.
              </p>
              <div className="flex justify-center">
                <Button 
                  className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90 text-white px-6 py-5"
                >
                  Learn More About INCEPTRIX
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Join Us on This Journey</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            We're just getting started, and we invite you to be part of the CodeChatter community. Sign up today and be among the first to experience the future of social coding.
          </p>
          <Button
            className="bg-gradient-to-r from-codechatter-blue to-codechatter-purple hover:opacity-90 text-white px-8 py-6 text-lg"
            asChild
          >
            <Link to="/dashboard">
              Get Started Now
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
