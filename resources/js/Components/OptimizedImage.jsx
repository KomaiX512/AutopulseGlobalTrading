import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Image } from 'antd';

const OptimizedImage = ({
    src,
    alt = '',
    className = '',
    size = 'medium',
    priority = 'normal',
    showPreview = false,
    width,
    height,
    style = {},
    onLoad,
    onError,
    fallback = '/images/placeholder-product.jpg',
    // New performance props
    enableInstantLoading = true,
    enableWebP = true,
    enablePlaceholder = true,
    lazyLoadOffset = 50,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [hasError, setHasError] = useState(false);
    const [placeholderLoaded, setPlaceholderLoaded] = useState(false);
    const imgRef = useRef(null);
    const observerRef = useRef(null);
    const loadAttemptRef = useRef(0);
    const maxLoadAttempts = 3;

    // Check WebP support (memoized)
    const supportsWebP = useMemo(() => {
        if (typeof window === 'undefined') return false;
        
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        } catch (e) {
            return false;
        }
    }, []);

    // Generate optimized image URLs with performance enhancement
    const getOptimizedUrls = useCallback((originalSrc) => {
        if (!originalSrc || originalSrc.startsWith('data:') || originalSrc.startsWith('http')) {
            return {
                webp: originalSrc,
                fallback: originalSrc,
                placeholder: getPlaceholderUrl(size),
                placeholderBase64: null
            };
        }

        const basePath = originalSrc.replace(/^\/storage\//, '').replace(/^storage\//, '');
        const pathParts = basePath.split('/');
        const filename = pathParts.pop();
        const directory = pathParts.join('/');
        const filenameWithoutExt = filename.split('.').slice(0, -1).join('.');
        const extension = filename.split('.').pop();

        const optimizedDir = `/storage/${directory}/optimized/${size}`;
        const placeholderDir = `/storage/${directory}/optimized/placeholder`;
        
        return {
            webp: enableWebP ? `${optimizedDir}/${filenameWithoutExt}_${size}.webp` : null,
            fallback: `${optimizedDir}/${filenameWithoutExt}_${size}.${extension}`,
            original: originalSrc,
            placeholder: enablePlaceholder ? `${placeholderDir}/${filenameWithoutExt}_placeholder.jpg` : null,
            placeholderBase64: null // Will be loaded dynamically if available
        };
    }, [size, enableWebP, enablePlaceholder]);

    // Get placeholder URL based on size
    const getPlaceholderUrl = useCallback((size) => {
        const placeholders = {
            thumbnail: '/images/placeholder-150x150.jpg',
            small: '/images/placeholder-300x300.jpg',
            medium: '/images/placeholder-600x600.jpg',
            large: '/images/placeholder-1200x1200.jpg',
            hero: '/images/placeholder-1920x1080.jpg'
        };
        return placeholders[size] || '/images/placeholder-product.jpg';
    }, []);

    // Generate blurred placeholder SVG (enhanced with better visual)
    const getBlurredPlaceholder = useCallback(() => {
        const dimensions = {
            thumbnail: { width: 150, height: 150 },
            small: { width: 300, height: 300 },
            medium: { width: 600, height: 600 },
            large: { width: 1200, height: 1200 },
            hero: { width: 1920, height: 1080 }
        };
        
        const { width: w, height: h } = dimensions[size] || dimensions.medium;
        
        const svg = `
            <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#e0e0e0;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#f0f0f0;stop-opacity:1" />
                        <animateTransform attributeName="gradientTransform" type="translate" 
                            values="-100 0;100 0;-100 0" dur="1.5s" repeatCount="indefinite"/>
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#shimmer)"/>
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" 
                      font-family="Arial, sans-serif" font-size="14">Loading...</text>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }, [size]);

    // Enhanced image loading with retry mechanism
    const loadImage = useCallback(async (urls) => {
        loadAttemptRef.current += 1;
        
        const imagesToTry = [];
        
        // Build priority list based on support and availability
        if (enableWebP && supportsWebP && urls.webp) {
            imagesToTry.push(urls.webp);
        }
        
        if (urls.fallback) {
            imagesToTry.push(urls.fallback);
        }
        
        if (urls.original) {
            imagesToTry.push(urls.original);
        }
        
        imagesToTry.push(fallback);

        for (const imageUrl of imagesToTry) {
            if (!imageUrl) continue;
            
            try {
                await new Promise((resolve, reject) => {
                    const img = new window.Image();
                    
                    // Performance optimization: set crossOrigin if needed
                    if (imageUrl.startsWith('http') && !imageUrl.startsWith(window.location.origin)) {
                        img.crossOrigin = 'anonymous';
                    }
                    
                    img.onload = () => {
                        // Preload next size if this is a thumbnail
                        if (size === 'thumbnail' && urls.fallback !== imageUrl) {
                            const nextImg = new window.Image();
                            nextImg.src = urls.fallback;
                        }
                        resolve();
                    };
                    
                    img.onerror = reject;
                    img.src = imageUrl;
                });
                
                return imageUrl;
            } catch (error) {
                console.warn(`Failed to load image: ${imageUrl}`, error);
                continue;
            }
        }
        
        throw new Error('All image sources failed to load');
    }, [enableWebP, supportsWebP, fallback, size]);

    // Load placeholder image first for instant loading
    const loadPlaceholder = useCallback(async (urls) => {
        if (!enablePlaceholder || !urls.placeholder) return null;
        
        try {
            await new Promise((resolve, reject) => {
                const img = new window.Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = urls.placeholder;
            });
            
            setPlaceholderLoaded(true);
            return urls.placeholder;
        } catch (error) {
            return null;
        }
    }, [enablePlaceholder]);

    // Enhanced Intersection Observer for lazy loading
    useEffect(() => {
        if (priority === 'high') {
            setIsInView(true);
            return;
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observerRef.current?.disconnect();
                }
            },
            {
                rootMargin: `${lazyLoadOffset}px`,
                threshold: 0.01
            }
        );

        if (imgRef.current) {
            observerRef.current.observe(imgRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [priority, lazyLoadOffset]);

    // Main image loading effect with instant loading support
    useEffect(() => {
        if (!isInView || !src) return;

        const urls = getOptimizedUrls(src);
        
        // Instant loading: load placeholder first
        if (enableInstantLoading && enablePlaceholder) {
            loadPlaceholder(urls).then((placeholderSrc) => {
                if (placeholderSrc && !isLoaded) {
                    setImageSrc(placeholderSrc);
                }
            });
        }
        
        // Load main image
        loadImage(urls)
            .then((finalSrc) => {
                setImageSrc(finalSrc);
                setIsLoaded(true);
                setHasError(false);
                onLoad?.();
            })
            .catch((error) => {
                if (loadAttemptRef.current < maxLoadAttempts) {
                    // Retry after a delay
                    setTimeout(() => {
                        loadImage(urls).then((finalSrc) => {
                            setImageSrc(finalSrc);
                            setIsLoaded(true);
                            setHasError(false);
                            onLoad?.();
                        }).catch(() => {
                            setImageSrc(fallback);
                            setHasError(true);
                            setIsLoaded(true);
                            onError?.(error);
                        });
                    }, 1000 * loadAttemptRef.current);
                } else {
                    console.warn('Failed to load optimized image after retries:', error);
                    setImageSrc(fallback);
                    setHasError(true);
                    setIsLoaded(true);
                    onError?.(error);
                }
            });
    }, [isInView, src, getOptimizedUrls, loadImage, loadPlaceholder, fallback, onLoad, onError, enableInstantLoading, enablePlaceholder, isLoaded]);

    // Get image loading attributes with performance optimizations
    const getLoadingAttributes = useCallback(() => {
        const baseAttributes = {
            loading: priority === 'high' ? 'eager' : 'lazy',
            decoding: priority === 'high' ? 'sync' : 'async',
        };

        if (priority === 'high') {
            baseAttributes.fetchpriority = 'high';
        }

        // Add performance hints
        if (enableWebP && supportsWebP) {
            baseAttributes['data-webp-supported'] = 'true';
        }

        return baseAttributes;
    }, [priority, enableWebP, supportsWebP]);

    // Get container style with enhanced loading states
    const getContainerStyle = useCallback(() => {
        const blurredPlaceholder = getBlurredPlaceholder();
        
        return {
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#f0f0f0',
            backgroundImage: (!isLoaded || (enableInstantLoading && !placeholderLoaded)) ? `url(${blurredPlaceholder})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'all 0.3s ease',
            ...style
        };
    }, [isLoaded, placeholderLoaded, enableInstantLoading, getBlurredPlaceholder, style]);

    // Get image style with smooth transitions
    const getImageStyle = useCallback(() => ({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'opacity 0.3s ease, filter 0.3s ease',
        opacity: isLoaded ? 1 : (placeholderLoaded ? 0.7 : 0),
        filter: isLoaded ? 'none' : (placeholderLoaded ? 'blur(2px)' : 'blur(5px)'),
    }), [isLoaded, placeholderLoaded]);

    // Performance monitoring (development only)
    useEffect(() => {
        if (process.env.NODE_ENV === 'development' && isLoaded) {
            const loadTime = performance.now();
            console.log(`Image loaded in ${loadTime.toFixed(2)}ms:`, src);
        }
    }, [isLoaded, src]);

    if (showPreview) {
        return (
            <div ref={imgRef} style={getContainerStyle()} className={className}>
                <Image.PreviewGroup>
                    <Image
                        src={imageSrc || getBlurredPlaceholder()}
                        alt={alt}
                        style={getImageStyle()}
                        width={width}
                        height={height}
                        {...getLoadingAttributes()}
                        {...props}
                    />
                </Image.PreviewGroup>
            </div>
        );
    }

    return (
        <div ref={imgRef} style={getContainerStyle()} className={`optimized-image-container ${className}`}>
            <img
                src={imageSrc || getBlurredPlaceholder()}
                alt={alt}
                style={getImageStyle()}
                width={width}
                height={height}
                {...getLoadingAttributes()}
                {...props}
            />
            
            {/* Enhanced loading indicator */}
            {!isLoaded && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#999',
                        fontSize: '14px',
                        fontFamily: 'Arial, sans-serif',
                        textAlign: 'center',
                        padding: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '4px',
                        backdropFilter: 'blur(4px)'
                    }}
                >
                    <div style={{ marginBottom: '4px' }}>Loading...</div>
                    {loadAttemptRef.current > 1 && (
                        <div style={{ fontSize: '12px', color: '#666' }}>
                            Attempt {loadAttemptRef.current}/{maxLoadAttempts}
                        </div>
                    )}
                </div>
            )}
            
            {/* Error indicator with retry option */}
            {hasError && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#999',
                        fontSize: '12px',
                        textAlign: 'center',
                        fontFamily: 'Arial, sans-serif',
                        padding: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        setHasError(false);
                        setIsLoaded(false);
                        loadAttemptRef.current = 0;
                        // Trigger reload
                        setIsInView(false);
                        setTimeout(() => setIsInView(true), 100);
                    }}
                >
                    <div>Image unavailable</div>
                    <div style={{ fontSize: '10px', marginTop: '2px' }}>Click to retry</div>
                </div>
            )}
            
            {/* Performance badge (development only) */}
            {process.env.NODE_ENV === 'development' && isLoaded && (
                <div
                    style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        fontSize: '10px',
                        backgroundColor: 'rgba(0, 255, 0, 0.8)',
                        color: 'white',
                        padding: '2px 4px',
                        borderRadius: '2px',
                        fontFamily: 'monospace'
                    }}
                >
                    {enableWebP && supportsWebP ? 'WebP' : 'IMG'}
                </div>
            )}
        </div>
    );
};

// Enhanced Progressive Image component
export const ProgressiveImage = ({
    src,
    alt = '',
    className = '',
    size = 'medium',
    priority = 'normal',
    style = {},
    enableWebP = true,
    transitionDuration = 300,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [highResLoaded, setHighResLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState('');
    
    const urls = useMemo(() => {
        if (!src) return {};
        
        const basePath = src.replace(/^\/storage\//, '').replace(/^storage\//, '');
        const pathParts = basePath.split('/');
        const filename = pathParts.pop();
        const directory = pathParts.join('/');
        const filenameWithoutExt = filename.split('.').slice(0, -1).join('.');
        const extension = filename.split('.').pop();

        return {
            placeholder: `/storage/${directory}/optimized/placeholder/${filenameWithoutExt}_placeholder.jpg`,
            lowRes: `/storage/${directory}/optimized/thumbnail/${filenameWithoutExt}_thumbnail.${extension}`,
            highRes: `/storage/${directory}/optimized/${size}/${filenameWithoutExt}_${size}.${extension}`,
            webp: enableWebP ? `/storage/${directory}/optimized/${size}/${filenameWithoutExt}_${size}.webp` : null
        };
    }, [src, size, enableWebP]);

    // Check WebP support
    const supportsWebP = useMemo(() => {
        if (typeof window === 'undefined') return false;
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        } catch (e) {
            return false;
        }
    }, []);

    useEffect(() => {
        if (!urls.placeholder && !urls.lowRes) return;

        // Load placeholder/low-res first
        const firstSrc = urls.placeholder || urls.lowRes;
        const firstImg = new window.Image();
        firstImg.onload = () => {
            setCurrentSrc(firstSrc);
            setIsLoaded(true);
        };
        firstImg.src = firstSrc;

        // Then load high-res
        const highResSrc = (enableWebP && supportsWebP && urls.webp) ? urls.webp : urls.highRes;
        if (highResSrc) {
            const highResImg = new window.Image();
            highResImg.onload = () => {
                setCurrentSrc(highResSrc);
                setHighResLoaded(true);
            };
            highResImg.src = highResSrc;
        }
    }, [urls, enableWebP, supportsWebP]);

    return (
        <div style={{ position: 'relative', ...style }} className={`progressive-image ${className}`}>
            <img
                src={currentSrc}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: !highResLoaded ? 'blur(3px)' : 'none',
                    transform: !highResLoaded ? 'scale(1.02)' : 'scale(1)',
                    transition: `all ${transitionDuration}ms ease`,
                    opacity: isLoaded ? 1 : 0,
                }}
                loading={priority === 'high' ? 'eager' : 'lazy'}
                decoding="async"
                {...props}
            />
            
            {/* Loading indicator for progressive image */}
            {!isLoaded && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        color: '#999',
                        fontSize: '14px'
                    }}
                >
                    Loading...
                </div>
            )}
        </div>
    );
};

export default OptimizedImage; 