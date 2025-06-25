import React, { useState, useEffect } from 'react';

const Preloader = ({ svg, transitionDuration = 500 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => setIsLoading(false), transitionDuration);
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, [transitionDuration]);

  return (
    <div
      className={`fixed inset-0 bg-white flex z-[1000] items-center justify-center transition-opacity duration-${transitionDuration} ${!isLoading && 'opacity-0 pointer-events-none'}`}
    >
        <img src="/images/Settings.gif" alt="" />
    </div>
  );
};

export default Preloader;
