import React, { Suspense, lazy } from 'react'

// Lazy load the heavy markdown processing libraries
const MarkdownRenderer = lazy_(() => import('./MarkdownRenderer'))

interface LazyMarkdownRendererProps {,
content: string
  className?: string}
const LazyMarkdownRenderer: React.FC<LazyMarkdownRendererProps> = (_{ content,  _className }) => {
return (
    <Suspense 
fallback={
        <div className={`animate-pulse ${className}`}>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      }
    >
      <MarkdownRenderer content={content} className={className} />
    </Suspense>
  )
}

export default LazyMarkdownRenderer
