
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-codechatter-dark border-t border-codechatter-blue/20 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Code size={24} className="text-codechatter-blue" />
              <span className="text-xl font-bold bg-gradient-to-r from-codechatter-blue to-codechatter-purple bg-clip-text text-transparent">
                CodeChatter
              </span>
            </Link>
            <p className="text-white/60 text-sm">
              A social coding platform to post problems, solve challenges, connect with coders, 
              and earn points—all with AI assistance.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white/60 hover:text-codechatter-blue transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white/60 hover:text-codechatter-blue transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white/60 hover:text-codechatter-blue transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white/60 hover:text-codechatter-blue transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/60 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-white/60 hover:text-white transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/60 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  API
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2025 CodeChatter. All rights reserved.
          </p>
          <p className="text-white/60 text-sm mt-4 md:mt-0">
            Built for INCEPTRIX Hackathon 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
