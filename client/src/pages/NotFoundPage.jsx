import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      >
        <AlertTriangle className="w-32 h-32 text-destructive mb-8" />
      </motion.div>
      <h1 className="text-6xl font-extrabold text-foreground mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-muted-foreground mb-6">Oops! Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-md">
        It seems like the page you're looking for has taken a detour or doesn't exist. Don't worry, let's get you back on track!
      </p>
      <Link to="/">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
          Go Back Home
        </Button>
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;