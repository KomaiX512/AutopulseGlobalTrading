<?php

namespace App\Traits;

use App\Services\ImageOptimizationService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

trait OptimizedImages
{
    /**
     * Get optimized image URL for specific size with performance optimization
     */
    public function getOptimizedImageUrl($imagePath, $size = 'medium', $preferWebP = true, $options = [])
    {
        if (!$imagePath) {
            return $this->getDefaultImageUrl($size);
        }

        $optimizationService = app(ImageOptimizationService::class);
        
        // Try performance-optimized version first
        $performanceResult = $optimizationService->getPerformanceOptimizedImage($imagePath, $size, array_merge([
            'prefer_webp' => $preferWebP,
            'include_placeholder' => $options['include_placeholder'] ?? true,
            'is_critical' => $options['is_critical'] ?? false
        ], $options));

        if ($performanceResult && $performanceResult['src']) {
            return $performanceResult;
        }

        // Fallback to original method
        $url = $optimizationService->getBestImageUrl($imagePath, $size, $preferWebP, true);
        return $url ?: $this->getDefaultImageUrl($size);
    }

    /**
     * Get instant loading image data with placeholder and critical hints
     */
    public function getInstantLoadingImageData($imagePath, $size = 'medium', $isCritical = false)
    {
        if (!$imagePath) {
            return $this->getDefaultInstantLoadingData($size);
        }

        // Cache the result for 1 hour to avoid repeated processing
        $cacheKey = 'instant_image_' . md5($imagePath . $size . ($isCritical ? '_critical' : ''));
        
        return Cache::remember($cacheKey, 3600, function () use ($imagePath, $size, $isCritical) {
            $optimizationService = app(ImageOptimizationService::class);
            
            return $optimizationService->getPerformanceOptimizedImage($imagePath, $size, [
                'prefer_webp' => true,
                'include_placeholder' => true,
                'is_critical' => $isCritical
            ]);
        });
    }

    /**
     * Get critical image preload hints for HTML head
     */
    public function getCriticalImagePreloadHints($imagePaths = null, $maxPreloads = 3)
    {
        $hints = [];
        $preloadCount = 0;
        
        // If no specific paths provided, try to determine critical images
        if (!$imagePaths) {
            $imagePaths = $this->getCriticalImagePaths();
        }
        
        if (!is_array($imagePaths)) {
            $imagePaths = [$imagePaths];
        }

        foreach ($imagePaths as $imagePath) {
            if ($preloadCount >= $maxPreloads) break;
            
            if ($imagePath) {
                $imageData = $this->getInstantLoadingImageData($imagePath, 'medium', true);
                
                if ($imageData && isset($imageData['preload_hint'])) {
                    $hints[] = $imageData['preload_hint'];
                    $preloadCount++;
                }
            }
        }

        return $hints;
    }

    /**
     * Determine critical image paths based on context
     */
    protected function getCriticalImagePaths()
    {
        $paths = [];
        
        // For products, primary image is critical
        if (isset($this->primary_image) && $this->primary_image) {
            $paths[] = $this->primary_image;
        } elseif (isset($this->image) && $this->image) {
            $paths[] = $this->image;
        }
        
        // For models with multiple images, first few are critical
        if (method_exists($this, 'images') && $this->images) {
            $firstImages = $this->images()->limit(2)->get();
            foreach ($firstImages as $image) {
                if (isset($image->image_path)) {
                    $paths[] = $image->image_path;
                } elseif (isset($image->path)) {
                    $paths[] = $image->path;
                }
            }
        }

        return array_slice($paths, 0, 3); // Limit to 3 critical images
    }

    /**
     * Get responsive image sources with instant loading features
     */
    public function getResponsiveImageSources($imagePath, $includePlaceholder = true)
    {
        if (!$imagePath) {
            return $this->getDefaultResponsiveSources();
        }

        $sources = [];
        $sizes = ['thumbnail', 'small', 'medium', 'large', 'hero'];

        foreach ($sizes as $size) {
            $imageData = $this->getInstantLoadingImageData($imagePath, $size, false);
            
            $sources[$size] = [
                'webp' => $imageData['webp_src'] ?? null,
                'fallback' => $imageData['src'] ?? $this->getDefaultImageUrl($size),
                'placeholder' => $includePlaceholder ? ($imageData['placeholder'] ?? null) : null,
                'placeholder_base64' => $includePlaceholder ? ($imageData['placeholder_base64'] ?? null) : null,
                'width' => $this->getSizeWidth($size),
                'height' => $this->getSizeHeight($size),
                'srcset' => $imageData['srcset'] ?? '',
                'webp_srcset' => $imageData['webp_srcset'] ?? '',
                'loading_strategy' => $imageData['loading_strategy'] ?? 'lazy'
            ];
        }

        return $sources;
    }

    /**
     * Get optimized picture element HTML with instant loading
     */
    public function getOptimizedPictureElement($imagePath, $alt = '', $class = '', $size = 'medium', $isCritical = false)
    {
        $imageData = $this->getInstantLoadingImageData($imagePath, $size, $isCritical);
        $sources = $this->getResponsiveImageSources($imagePath, true);
        $currentSource = $sources[$size] ?? $sources['medium'];

        $html = '<picture class="optimized-picture ' . htmlspecialchars($class) . '">';
        
        // Add WebP sources with srcset
        if (!empty($currentSource['webp_srcset'])) {
            $html .= sprintf(
                '<source srcset="%s" type="image/webp" sizes="%s">',
                $currentSource['webp_srcset'],
                $this->getSizesAttribute()
            );
        } elseif ($currentSource['webp']) {
            $html .= sprintf(
                '<source srcset="%s" type="image/webp">',
                $currentSource['webp']
            );
        }
        
        // Add fallback sources with srcset
        if (!empty($currentSource['srcset'])) {
            $html .= sprintf(
                '<source srcset="%s" sizes="%s">',
                $currentSource['srcset'],
                $this->getSizesAttribute()
            );
        }
        
        // Main img element with instant loading features
        $imgAttributes = [];
        $imgAttributes['src'] = $currentSource['placeholder_base64'] ?: $currentSource['placeholder'] ?: $currentSource['fallback'];
        $imgAttributes['data-src'] = $currentSource['fallback'];
        $imgAttributes['data-srcset'] = $currentSource['srcset'];
        
        if ($currentSource['webp']) {
            $imgAttributes['data-webp'] = $currentSource['webp'];
            $imgAttributes['data-webp-srcset'] = $currentSource['webp_srcset'];
        }
        
        $imgAttributes['alt'] = htmlspecialchars($alt);
        $imgAttributes['loading'] = $isCritical ? 'eager' : 'lazy';
        $imgAttributes['decoding'] = $isCritical ? 'sync' : 'async';
        
        if ($isCritical) {
            $imgAttributes['fetchpriority'] = 'high';
        }
        
        $imgAttributes['width'] = $currentSource['width'];
        $imgAttributes['height'] = $currentSource['height'];
        $imgAttributes['class'] = 'optimized-image lazy-load';
        
        // Add placeholder styling
        if ($currentSource['placeholder_base64']) {
            $imgAttributes['style'] = 'background-image: url(' . $currentSource['placeholder_base64'] . '); background-size: cover; filter: blur(5px); transition: filter 0.3s ease;';
            $imgAttributes['onload'] = 'this.style.filter = "none";';
        }

        // Build img tag
        $imgHtml = '<img';
        foreach ($imgAttributes as $attr => $value) {
            if ($value !== null && $value !== '') {
                $imgHtml .= ' ' . $attr . '="' . htmlspecialchars($value) . '"';
            }
        }
        $imgHtml .= '>';
        
        $html .= $imgHtml;
        $html .= '</picture>';
        
        return $html;
    }

    /**
     * Get advanced image attributes for React/Vue components
     */
    public function getAdvancedImageAttributes($imagePath, $size = 'medium', $alt = '', $isCritical = false, $class = '')
    {
        $imageData = $this->getInstantLoadingImageData($imagePath, $size, $isCritical);
        $sources = $this->getResponsiveImageSources($imagePath, true);
        $currentSource = $sources[$size] ?? $sources['medium'];

        return [
            // Basic attributes
            'src' => $currentSource['fallback'],
            'alt' => $alt,
            'className' => $class,
            'width' => $currentSource['width'],
            'height' => $currentSource['height'],
            
            // Performance attributes
            'loading' => $isCritical ? 'eager' : 'lazy',
            'decoding' => $isCritical ? 'sync' : 'async',
            'fetchPriority' => $isCritical ? 'high' : 'auto',
            
            // Responsive attributes
            'srcSet' => $currentSource['srcset'],
            'sizes' => $this->getSizesAttribute(),
            
            // WebP support
            'webpSrc' => $currentSource['webp'],
            'webpSrcSet' => $currentSource['webp_srcset'],
            
            // Placeholder for instant loading
            'placeholderSrc' => $currentSource['placeholder'],
            'placeholderBase64' => $currentSource['placeholder_base64'],
            
            // Performance hints
            'preloadHint' => $isCritical ? ($imageData['preload_hint'] ?? null) : null,
            'loadingStrategy' => $currentSource['loading_strategy'],
            
            // Optimization metadata
            'optimized' => true,
            'hasWebP' => !empty($currentSource['webp']),
            'hasPlaceholder' => !empty($currentSource['placeholder']),
            'isCritical' => $isCritical
        ];
    }

    /**
     * Get inline CSS for critical image optimization
     */
    public function getCriticalImageCSS($imagePaths = null)
    {
        $css = "
        <style>
        /* Critical image optimization styles */
        .optimized-picture {
            position: relative;
            overflow: hidden;
            background-color: #f0f0f0;
        }
        
        .optimized-image {
            width: 100%;
            height: auto;
            transition: filter 0.3s ease, opacity 0.3s ease;
        }
        
        .optimized-image.loading {
            filter: blur(5px);
        }
        
        .optimized-image.loaded {
            filter: none;
        }
        
        /* Placeholder animation */
        .image-placeholder {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        /* Critical images get priority */
        .critical-image {
            content-visibility: auto;
            contain-intrinsic-size: 600px 400px;
        }
        </style>";

        // Add specific preload CSS for critical images
        if ($imagePaths) {
            $preloadHints = $this->getCriticalImagePreloadHints($imagePaths);
            if (!empty($preloadHints)) {
                $css .= "\n" . implode("\n", $preloadHints);
            }
        }

        return $css;
    }

    /**
     * Get JavaScript for enhanced lazy loading
     */
    public function getLazyLoadingScript()
    {
        return "
        <script>
        // Enhanced lazy loading with WebP support and intersection observer
        (function() {
            'use strict';
            
            // Check WebP support
            const supportsWebP = (function() {
                const canvas = document.createElement('canvas');
                canvas.width = 1;
                canvas.height = 1;
                return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
            })();
            
            // Intersection Observer for lazy loading
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            function loadImage(img) {
                const webpSrc = supportsWebP ? img.dataset.webp : null;
                const regularSrc = img.dataset.src;
                const webpSrcset = supportsWebP ? img.dataset.webpSrcset : null;
                const regularSrcset = img.dataset.srcset;
                
                // Create a new image to test loading
                const testImg = new Image();
                
                testImg.onload = function() {
                    // Update the actual image
                    if (webpSrcset && supportsWebP) {
                        img.srcset = webpSrcset;
                    } else if (regularSrcset) {
                        img.srcset = regularSrcset;
                    }
                    
                    img.src = this.src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                    
                    // Trigger onload event
                    if (img.onload) img.onload();
                };
                
                testImg.onerror = function() {
                    // Fallback to regular source
                    img.src = regularSrc;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                };
                
                // Start loading
                if (webpSrc && supportsWebP) {
                    testImg.src = webpSrc;
                } else {
                    testImg.src = regularSrc;
                }
            }
            
            // Initialize lazy loading
            function initLazyLoading() {
                const lazyImages = document.querySelectorAll('.lazy-load[data-src]');
                lazyImages.forEach(img => {
                    img.classList.add('loading');
                    imageObserver.observe(img);
                });
            }
            
            // Start when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initLazyLoading);
            } else {
                initLazyLoading();
            }
            
            // Expose function for dynamic content
            window.AutoPulseImages = {
                initLazyLoading: initLazyLoading,
                supportsWebP: supportsWebP
            };
        })();
        </script>";
    }

    /**
     * Get default instant loading data
     */
    protected function getDefaultInstantLoadingData($size = 'medium')
    {
        $defaultUrl = $this->getDefaultImageUrl($size);
        
        return [
            'src' => $defaultUrl,
            'webp_src' => null,
            'placeholder' => null,
            'placeholder_base64' => $this->getDefaultBlurredPlaceholder(),
            'srcset' => '',
            'webp_srcset' => '',
            'preload_hint' => null,
            'loading_strategy' => 'lazy'
        ];
    }

    /**
     * Get responsive image sources with instant loading features (enhanced version)
     */
    public function getResponsiveImageSourcesLegacy($imagePath)
    {
        if (!$imagePath) {
            return $this->getDefaultResponsiveSources();
        }

        $sources = [];
        $sizes = ['thumbnail', 'small', 'medium', 'large', 'hero'];

        foreach ($sizes as $size) {
            $webpUrl = $this->getOptimizedImageUrl($imagePath, $size, true);
            $fallbackUrl = $this->getOptimizedImageUrl($imagePath, $size, false);
            
            $sources[$size] = [
                'webp' => $webpUrl,
                'fallback' => $fallbackUrl,
                'width' => $this->getSizeWidth($size),
                'height' => $this->getSizeHeight($size)
            ];
        }

        return $sources;
    }

    /**
     * Get picture element HTML with responsive sources
     */
    public function getPictureElementHtml($imagePath, $alt = '', $class = '', $sizes = 'medium')
    {
        $sources = $this->getResponsiveImageSources($imagePath);
        $defaultSource = $sources[$sizes] ?? $sources['medium'];

        $html = '<picture>';
        
        // Add WebP sources
        foreach ($sources as $size => $source) {
            $html .= sprintf(
                '<source media="(max-width: %dpx)" srcset="%s" type="image/webp">',
                $this->getBreakpoint($size),
                $source['webp']
            );
        }
        
        // Add fallback sources
        foreach ($sources as $size => $source) {
            $html .= sprintf(
                '<source media="(max-width: %dpx)" srcset="%s">',
                $this->getBreakpoint($size),
                $source['fallback']
            );
        }
        
        // Default img element
        $html .= sprintf(
            '<img src="%s" alt="%s" class="%s" loading="lazy" decoding="async">',
            $defaultSource['fallback'],
            htmlspecialchars($alt),
            htmlspecialchars($class)
        );
        
        $html .= '</picture>';
        
        return $html;
    }

    /**
     * Get srcset attribute for responsive images
     */
    public function getSrcsetAttribute($imagePath, $includeWebP = false)
    {
        if (!$imagePath) {
            return '';
        }

        $sources = $this->getResponsiveImageSources($imagePath);
        $srcset = [];

        foreach ($sources as $size => $source) {
            $url = $includeWebP ? $source['webp'] : $source['fallback'];
            $width = $source['width'];
            $srcset[] = "{$url} {$width}w";
        }

        return implode(', ', $srcset);
    }

    /**
     * Get image dimensions for specific size
     */
    public function getImageDimensions($imagePath, $size = 'medium')
    {
        return [
            'width' => $this->getSizeWidth($size),
            'height' => $this->getSizeHeight($size)
        ];
    }

    /**
     * Get blurred placeholder data URL
     */
    public function getBlurredPlaceholder($imagePath, $quality = 20)
    {
        if (!$imagePath) {
            return $this->getDefaultBlurredPlaceholder();
        }

        try {
            $thumbnailUrl = $this->getOptimizedImageUrl($imagePath, 'thumbnail', false);
            
            // Create a very small, blurred version for placeholder
            return "data:image/svg+xml;base64," . base64_encode(
                '<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">' .
                '<defs>' .
                '<filter id="blur">' .
                '<feGaussianBlur in="SourceGraphic" stdDeviation="2"/>' .
                '</filter>' .
                '</defs>' .
                '<image width="150" height="150" href="' . $thumbnailUrl . '" filter="url(#blur)"/>' .
                '</svg>'
            );
        } catch (\Exception $e) {
            return $this->getDefaultBlurredPlaceholder();
        }
    }

    /**
     * Check if image is optimized
     */
    public function isImageOptimized($imagePath)
    {
        if (!$imagePath) {
            return false;
        }

        $pathInfo = pathinfo($imagePath);
        $directory = dirname($imagePath);
        $optimizedDir = storage_path('app/' . $directory . '/optimized');
        
        return is_dir($optimizedDir) && !empty(glob($optimizedDir . '/*/' . $pathInfo['filename'] . '_*'));
    }

    /**
     * Get image loading strategy based on priority
     */
    public function getImageLoadingStrategy($priority = 'normal')
    {
        switch ($priority) {
            case 'high':
                return [
                    'loading' => 'eager',
                    'fetchpriority' => 'high',
                    'decoding' => 'sync'
                ];
            case 'low':
                return [
                    'loading' => 'lazy',
                    'fetchpriority' => 'low',
                    'decoding' => 'async'
                ];
            default:
                return [
                    'loading' => 'lazy',
                    'decoding' => 'async'
                ];
        }
    }

    /**
     * Get complete image attributes for optimal loading
     */
    public function getOptimalImageAttributes($imagePath, $size = 'medium', $alt = '', $priority = 'normal', $class = '')
    {
        $sources = $this->getResponsiveImageSources($imagePath);
        $dimensions = $this->getImageDimensions($imagePath, $size);
        $loadingStrategy = $this->getImageLoadingStrategy($priority);
        $blurredPlaceholder = $this->getBlurredPlaceholder($imagePath);

        return [
            'src' => $sources[$size]['fallback'] ?? $this->getDefaultImageUrl($size),
            'srcset' => $this->getSrcsetAttribute($imagePath, false),
            'data-srcset-webp' => $this->getSrcsetAttribute($imagePath, true),
            'sizes' => $this->getSizesAttribute(),
            'width' => $dimensions['width'],
            'height' => $dimensions['height'],
            'alt' => $alt,
            'class' => $class,
            'data-placeholder' => $blurredPlaceholder,
            'style' => 'background-image: url(' . $blurredPlaceholder . '); background-size: cover; background-position: center;',
        ] + $loadingStrategy;
    }

    /**
     * Protected helper methods
     */
    protected function getSizeWidth($size)
    {
        $dimensions = [
            'thumbnail' => 150,
            'small' => 300,
            'medium' => 600,
            'large' => 1200,
            'hero' => 1920
        ];

        return $dimensions[$size] ?? 600;
    }

    protected function getSizeHeight($size)
    {
        $dimensions = [
            'thumbnail' => 150,
            'small' => 300,
            'medium' => 600,
            'large' => 1200,
            'hero' => 1080
        ];

        return $dimensions[$size] ?? 600;
    }

    protected function getBreakpoint($size)
    {
        $breakpoints = [
            'thumbnail' => 320,
            'small' => 480,
            'medium' => 768,
            'large' => 1024,
            'hero' => 1920
        ];

        return $breakpoints[$size] ?? 768;
    }

    protected function getSizesAttribute()
    {
        return '(max-width: 320px) 280px, (max-width: 480px) 440px, (max-width: 768px) 728px, (max-width: 1024px) 984px, 1200px';
    }

    protected function getDefaultImageUrl($size = 'medium')
    {
        $placeholders = [
            'thumbnail' => '/images/placeholder-150x150.jpg',
            'small' => '/images/placeholder-300x300.jpg',
            'medium' => '/images/placeholder-600x600.jpg',
            'large' => '/images/placeholder-1200x1200.jpg',
            'hero' => '/images/placeholder-1920x1080.jpg'
        ];

        return $placeholders[$size] ?? '/images/placeholder-product.jpg';
    }

    protected function getDefaultResponsiveSources()
    {
        $sizes = ['thumbnail', 'small', 'medium', 'large', 'hero'];
        $sources = [];

        foreach ($sizes as $size) {
            $url = $this->getDefaultImageUrl($size);
            $sources[$size] = [
                'webp' => $url,
                'fallback' => $url,
                'width' => $this->getSizeWidth($size),
                'height' => $this->getSizeHeight($size)
            ];
        }

        return $sources;
    }

    protected function getDefaultBlurredPlaceholder()
    {
        return "data:image/svg+xml;base64," . base64_encode(
            '<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">' .
            '<rect width="100%" height="100%" fill="#f0f0f0"/>' .
            '<text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-family="Arial, sans-serif" font-size="18">Loading...</text>' .
            '</svg>'
        );
    }
} 