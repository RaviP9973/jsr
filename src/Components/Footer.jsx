import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        {/* Footer Top */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Aerial Insight</h3>
            <p className="text-gray-400 text-sm">
              Revolutionizing building inspections with drone technology.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8 text-gray-400 text-sm">
            <a href="#about" className="hover:text-yellow-400 transition-colors">
              About Us
            </a>
            <a href="#services" className="hover:text-yellow-400 transition-colors">
              Services
            </a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Aerial Insight. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
