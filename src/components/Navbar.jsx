import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '센터소개', href: '/#about', type: 'anchor' },
    { name: '제공서비스', href: '/#services', type: 'anchor' },
    { name: '비용계산기', href: '/calculator', type: 'link' },
    { name: '커뮤니티', href: '/notice', type: 'link' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-5'}`}>
      <div className="container flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
            香
          </div>
          <span className="text-xl font-bold text-primary">향기재가센터</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.type === 'link' ? (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`font-medium transition-colors ${location.pathname === link.href ? 'text-primary' : 'hover:text-primary'}`}
              >
                {link.name}
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={link.href} 
                className="font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            )
          ))}
          <a href="tel:032-563-8927" className="btn-primary">
            <Phone size={18} />
            032-563-8927
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full glass p-6 flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              link.type === 'link' ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-lg font-medium ${location.pathname === link.href ? 'text-primary' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <a href="tel:032-563-8927" className="btn-primary justify-center">
              <Phone size={18} />
              032-563-8927
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
