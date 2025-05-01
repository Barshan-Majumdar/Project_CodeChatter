
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-codechatter-dark/80 backdrop-blur-md border-b border-codechatter-blue/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code size={24} className="text-codechatter-blue" />
            <span className="text-xl font-bold bg-gradient-to-r from-codechatter-blue to-codechatter-purple bg-clip-text text-transparent">
              CodeChatter
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/features" className="text-sm text-white/80 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm text-white/80 hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/dashboard" className="text-sm text-white/80 hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Log In
            </Button>
            <Button className="bg-gradient-to-r from-codechatter-purple to-codechatter-blue hover:opacity-90 text-white">
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 mt-2 flex flex-col space-y-4">
            <Link to="/" className="text-white/80 hover:text-white py-2">
              Home
            </Link>
            <Link to="/features" className="text-white/80 hover:text-white py-2">
              Features
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white py-2">
              About
            </Link>
            <Link to="/contact" className="text-white/80 hover:text-white py-2">
              Contact
            </Link>
            <Link to="/dashboard" className="text-white/80 hover:text-white py-2">
              Dashboard
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" className="w-full">
                Log In
              </Button>
              <Button className="w-full bg-gradient-to-r from-codechatter-purple to-codechatter-blue">
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
