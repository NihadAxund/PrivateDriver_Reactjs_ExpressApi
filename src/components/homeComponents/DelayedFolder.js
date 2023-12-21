// DelayedFolder.js

import React, { useEffect, useState } from 'react';
import Folder from './Folder';
import JoinedFolder from './JoinedFolder';

const DelayedFolder = ({ folder, delay,isGuest=false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  if(isGuest){
    
    return isVisible ? <JoinedFolder folder={folder} /> : null;
  }
  else{
    return isVisible ? <Folder folder={folder} /> : null;
  }
};

export default DelayedFolder;
