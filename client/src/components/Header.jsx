import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Dumbbell, UtensilsCrossed, UserCircle, LayoutDashboard, LineChart, LogOut, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const navItems = [
  { path: '/', label: 'Home', icon: Dumbbell, public: true },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, public: false },
  { path: '/meal-plans', label: 'Meal Plans', icon: UtensilsCrossed, public: false },
  { path: '/recipes', label: 'Recipes', icon: UtensilsCrossed, public: false },
  { path: '/progress', label: 'Progress', icon: LineChart, public: false },
];

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="bg-background/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-border"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">
          <span className="gradient-text">FitSyncX</span>
        </Link>
        <nav className="hidden md:flex space-x-2 items-center">
          {navItems.filter(item => item.public || user).map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-accent/10 ${
                    isActive ? 'bg-accent/20 text-accent-foreground dark:text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <IconComponent className={`w-5 h-5 mr-2 ${isActive ? 'text-primary dark:text-primary' : 'text-muted-foreground'}`} />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
          {user && (
             <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-accent/10 ${
                    isActive ? 'bg-accent/20 text-accent-foreground dark:text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <UserCircle className={`w-5 h-5 mr-2 ${isActive ? 'text-primary dark:text-primary' : 'text-muted-foreground'}`} />
                    Profile
                  </>
                )}
              </NavLink>
          )}
        </nav>
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 focus-visible:ring-0 focus-visible:ring-offset-0">
                  <UserCircle className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-foreground">{user.name || 'User'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate('/login')}>
                <LogIn className="mr-2 h-4 w-4"/> Login
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => navigate('/signup')}>
               <UserPlus className="mr-2 h-4 w-4"/> Sign Up
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">
           {user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-6 w-6 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>{user.name || 'User Menu'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 {navItems.filter(item => item.public || user).map((item) => (
                    <DropdownMenuItem key={`mobile-${item.path}`} onClick={() => navigate(item.path)}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button variant="ghost" size="icon" onClick={() => navigate('/login')}>
                <LogIn className="h-6 w-6 text-primary" />
              </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

 export default Header;