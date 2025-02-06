import React from 'react';
import { Github, Linkedin, Mail, Cloud, GitBranch, GitMerge } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const socialLinks = [
    { icon: <Github size={24} />, href: "https://github.com/mohammedmatheensharieff" },
                { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/mohammedmatheensharieff/" },
                { icon: <Mail size={24} />, href: "mailto:mohammed@zoeencloud.in" }
  ];

  const footerLinks = [
    { name: 'About', path: '/about' },
    // { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-gradient-to-r from-background-dark via-gray-900 to-background-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Cloud className="h-8 w-8 text-gradient-start" />
                <GitBranch className="h-4 w-4 text-gradient-mid absolute -bottom-1 -right-1" />
                <GitMerge className="h-4 w-4 text-gradient-end absolute -top-1 -right-1" />
              </div>
            </Link>
            <h3 className="text-lg font-semibold text-white mb-2">
              Mohammed Matheen
            </h3>
            <p className="text-gray-400 text-center md:text-left">
              Cloud Architect & DevOps Lead
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end text-black hover:shadow-lg transition-shadow duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mohammed Matheen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}