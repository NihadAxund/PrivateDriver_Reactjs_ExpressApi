// DelayedFolder.js

import React, { useEffect, useState } from 'react';
import Folder from './Folder';

const DelayedFolder = ({ folder, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return isVisible ? <Folder folder={folder} /> : null;
};

export default DelayedFolder;
