import { useState, useEffect } from 'react';

export const useToDoFunctions = () => {
    
    const [notifications, setNotifications] = useState([]);
    const [views, setViews] = useState(0);
    const shareUrl = 'https://next-to-do-app-nu.vercel.app/';
    const shareMessage = `I PLANNER application to maintain my daily tasks, checklists and notes. Check out the PLANNER at:`;

    const addNotification = (message) => {
      setNotifications([message]);
    };

    const handleViews = (id) => {
      setViews(id);
    }
  
    useEffect(() => {
      // Hiding the notification after 5 seconds when notification state changes
      const timeout = setTimeout(() => {
        setNotifications((prevNotifications) => prevNotifications.slice(1));
      }, 5000); 
    
      return () => clearTimeout(timeout);
    }, [notifications]); 

    return {
      notifications,
      views,
      shareUrl,
      shareMessage,
      handleViews,
    };
};
