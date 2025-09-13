import React, { useState, useCallback, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage Component - Core Web Vitals Optimized
 * Features:
 * - WebP format support with fallback
 * - Lazy loading with intersection observer
 * - Placeholder support for CLS prevention
 * - Responsive image sizing
 * - Priority loading for LCP images
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  sizes = '100vw',
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Create WebP version URL
  const getWebPSrc = (originalSrc: string): string => {
    if (originalSrc.includes('.svg')) return originalSrc; // Don't convert SVGs
    return originalSrc.replace(/\.(jpe?g|png)$/i, '.webp');
  };

  // Handle successful image load
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  // Handle image load error (fallback to original format)
  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    
    // If WebP failed, try original format
    if (img.src.includes('.webp')) {
      img.src = src; // Fallback to original
    } else {
      setHasError(true);
      onError?.();
    }
  }, [src, onError]);

  // Intersection observer for lazy loading
  React.useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate responsive srcset for better performance
  const generateSrcSet = (baseSrc: string): string => {
    if (baseSrc.includes('.svg')) return baseSrc;
    
    const webpSrc = getWebPSrc(baseSrc);
    return `
      ${webpSrc} 1x,
      ${webpSrc.replace(/(\.[^.]+)$/, '@2x$1')} 2x
    `.trim();
  };

  // Placeholder styles
  const placeholderStyle: React.CSSProperties = {
    backgroundColor: placeholder || '#f3f4f6',
    backgroundImage: placeholder ? `url(${placeholder})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    fontSize: '0.875rem'
  };

  // Container styles for CLS prevention
  const containerStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || 'auto',
    position: 'relative',
    overflow: 'hidden'
  };

  // Image styles
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 1 : 0
  };

  if (hasError) {
    return (
      <div 
        ref={imgRef}
        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ ...containerStyle, ...placeholderStyle }}
        className={className}
        role="img"
        aria-label={alt}
      >
        Image not available
      </div>
    );
  }

  return (
    <div style={containerStyle} className={className}>
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
            ...placeholderStyle,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          Loading...
        </div>
      )}
      
      {/* Actual image - only render when in view or priority */}
      {(isInView || priority) && (
        <picture>
          {/* WebP source for modern browsers */}
          <source
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Fallback for older browsers */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={imageStyle}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            // Improve performance hints
            fetchPriority={priority ? 'high' : 'low'}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;