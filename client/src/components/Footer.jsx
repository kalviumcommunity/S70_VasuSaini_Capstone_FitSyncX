import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-background/80 backdrop-blur-md py-8 text-center text-muted-foreground border-t border-border"
    >
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {currentYear} FitSyncX. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Your AI-Powered Fitness & Nutrition Companion.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;