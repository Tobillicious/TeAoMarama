/**
 * Virtualized Resource Grid for Performance at Scale
 * Handles thousands of resources efficiently
 */

import React, { useMemo, useState, useCallback } from 'react';
import { FixedSizeGrid as Grid, FixedSizeList as List } from 'react-window';
import { Link } from 'react-router-dom';
import type { ParsedResource } from '../services/MetadataParser';

interface VirtualizedResourceGridProps {
  resources: ParsedResource[];
  viewMode: 'grid' | 'list' | 'cards';
  containerHeight?: number;
  containerWidth?: number;
}

// Memoized resource card for performance
const ResourceCard = React.memo(({ resource, style, viewMode }: {
  resource: ParsedResource;
  style?: React.CSSProperties;
  viewMode: 'grid' | 'list' | 'cards';
}) => {
  if (viewMode === 'list') {
    return (
      <div style={style}>
        <Link
          to={`/resource?path=${encodeURIComponent(resource.relativePath)}`}
          className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 transition-colors"
          style={{ borderColor: 'var(--color-border)', height: '100%' }}
        >
          <div className="col-span-4">
            <h3 className="font-medium line-clamp-1">{resource.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">{resource.preview}</p>
          </div>
          <div className="col-span-2 text-sm">{resource.metadata.subject}</div>
          <div className="col-span-1 text-sm">{resource.metadata.yearLevel}</div>
          <div className="col-span-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              resource.metadata.culturalSafetyLevel === 'clean' ? 'bg-green-100 text-green-800' :
              resource.metadata.culturalSafetyLevel === 'review' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {resource.metadata.culturalSafetyIcon} {resource.metadata.culturalSafetyLevel}
            </span>
          </div>
          <div className="col-span-2 text-sm text-gray-600">
            {new Date(resource.modifiedAt).toLocaleDateString()}
          </div>
          <div className="col-span-1 text-sm text-gray-600">
            {(resource.sizeBytes / 1024).toFixed(1)} KB
          </div>
        </Link>
      </div>
    );
  }

  if (viewMode === 'cards') {
    return (
      <div style={style} className="p-3">
        <div
          className="bg-white rounded-lg border p-6 h-full"
          style={{ 
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-light)'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                 style={{ backgroundColor: 'var(--color-pounamu)' }}>
              📄
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{resource.title}</h3>
              <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--color-neutral-700)' }}>
                {resource.preview || 'No preview available'}
              </p>
              
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-2 py-1 rounded-full text-xs" style={{ 
                  backgroundColor: 'var(--color-neutral-100)',
                  color: 'var(--color-neutral-700)'
                }}>
                  {resource.metadata.subject}
                </span>
                <span className="px-2 py-1 rounded-full text-xs" style={{ 
                  backgroundColor: 'var(--color-neutral-100)',
                  color: 'var(--color-neutral-700)'
                }}>
                  {resource.metadata.yearLevel}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
                  {new Date(resource.modifiedAt).toLocaleDateString()}
                </div>
                
                <Link
                  to={`/resource?path=${encodeURIComponent(resource.relativePath)}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: 'var(--color-pounamu)',
                    color: 'white'
                  }}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div style={style} className="p-3">
      <Link
        to={`/resource?path=${encodeURIComponent(resource.relativePath)}`}
        className="block rounded-lg border p-4 transition-all hover:shadow-lg h-full"
        style={{ 
          borderColor: 'var(--color-border)',
          backgroundColor: 'var(--color-white)'
        }}
      >
        <div className="aspect-square bg-gradient-to-br rounded-lg mb-4 flex items-center justify-center text-4xl"
             style={{ 
               backgroundImage: `linear-gradient(135deg, var(--color-pounamu), var(--color-kowhai))`
             }}>
          📄
        </div>
        
        <h3 className="font-bold mb-2 line-clamp-2">{resource.title}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <span className="px-2 py-1 rounded-full text-xs" style={{ 
              backgroundColor: 'var(--color-neutral-100)',
              color: 'var(--color-neutral-700)'
            }}>
              {resource.metadata.subject}
            </span>
            <span className="px-2 py-1 rounded-full text-xs" style={{ 
              backgroundColor: 'var(--color-neutral-100)',
              color: 'var(--color-neutral-700)'
            }}>
              {resource.metadata.yearLevel}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-neutral-500)' }}>
            <span>{new Date(resource.modifiedAt).toLocaleDateString()}</span>
            <span>{(resource.sizeBytes / 1024).toFixed(1)} KB</span>
          </div>
        </div>
      </Link>
    </div>
  );
});

ResourceCard.displayName = 'ResourceCard';

export const VirtualizedResourceGrid: React.FC<VirtualizedResourceGridProps> = ({
  resources,
  viewMode,
  containerHeight = 600,
  containerWidth = 1200
}) => {
  // Performance optimization: calculate dimensions based on view mode
  const { itemHeight, itemWidth, columnCount } = useMemo(() => {
    switch (viewMode) {
      case 'list':
        return { itemHeight: 80, itemWidth: containerWidth, columnCount: 1 };
      case 'cards':
        return { itemHeight: 280, itemWidth: 600, columnCount: Math.floor(containerWidth / 600) || 1 };
      case 'grid':
      default:
        const cardWidth = 300;
        const columns = Math.floor(containerWidth / cardWidth) || 1;
        return { itemHeight: 350, itemWidth: cardWidth, columnCount: columns };
    }
  }, [viewMode, containerWidth]);

  // Memoized item renderer for virtual list/grid
  const ItemRenderer = useCallback(({ columnIndex, rowIndex, style }: any) => {
    const index = viewMode === 'list' ? rowIndex : rowIndex * columnCount + columnIndex;
    const resource = resources[index];
    
    if (!resource) return null;
    
    return (
      <ResourceCard
        key={resource.id}
        resource={resource}
        style={style}
        viewMode={viewMode}
      />
    );
  }, [resources, viewMode, columnCount]);

  // Use FixedSizeList for list view, FixedSizeGrid for grid views
  if (viewMode === 'list') {
    return (
      <div className="w-full">
        {/* List Header */}
        <div className="bg-white rounded-lg border overflow-hidden mb-4" style={{ borderColor: 'var(--color-border)' }}>
          <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium text-sm" 
               style={{ 
                 borderColor: 'var(--color-border)',
                 backgroundColor: 'var(--color-neutral-50)'
               }}>
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Subject</div>
            <div className="col-span-1">Year</div>
            <div className="col-span-2">Safety</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-1">Size</div>
          </div>
        </div>
        
        <List
          height={containerHeight}
          itemCount={resources.length}
          itemSize={itemHeight}
          width="100%"
          style={{ backgroundColor: 'white', border: '1px solid var(--color-border)' }}
        >
          {ItemRenderer}
        </List>
      </div>
    );
  }

  // Grid and Cards view using FixedSizeGrid
  const rowCount = Math.ceil(resources.length / columnCount);
  
  return (
    <Grid
      columnCount={columnCount}
      columnWidth={itemWidth}
      height={containerHeight}
      rowCount={rowCount}
      rowHeight={itemHeight}
      width={containerWidth}
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {ItemRenderer}
    </Grid>
  );
};

export default VirtualizedResourceGrid;