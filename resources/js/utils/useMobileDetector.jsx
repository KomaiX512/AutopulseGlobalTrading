import { useState, useEffect } from 'react';

export const useMobileDetector = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            const mobile = width <= 768;
            const tablet = width > 768 && width <= 1024;
            
            setIsMobile(mobile);
            setIsTablet(tablet);
            
            // Debug log for development
            if (process.env.NODE_ENV === 'development') {
                console.log(`Screen width: ${width}px, Mobile: ${mobile}, Tablet: ${tablet}`);
            }
        };

        // Check on mount
        checkDevice();

        // Add event listener for window resize
        window.addEventListener('resize', checkDevice);

        // Cleanup
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return { isMobile, isTablet };
}; 