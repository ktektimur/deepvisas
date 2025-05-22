
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // On component mount, check localStorage or system preference
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle('dark', systemPrefersDark);
      localStorage.setItem('theme', systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Update the DOM
    document.documentElement.classList.toggle('dark', newDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleDarkMode}
      className="rounded-full"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
