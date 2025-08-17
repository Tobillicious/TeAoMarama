/**
 * Enhanced Resources Page - Scalable for Thousands of Educational Resources
 *
 * Features:
 * - Hierarchical navigation: Subject Areas > Unit Plans > Lesson Plans > Resources
 * - Beautiful Te Kete Ako design system integration
 * - Performance optimized for massive datasets
 * - Advanced filtering and search capabilities
 * - Responsive design for all screen sizes
 * - Cultural safety indicators and content curation
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MigrationDashboard from '../components/MigrationDashboard';
import PerformanceMonitor from '../components/PerformanceMonitor';
import { MetadataParser, type ParsedResource } from '../services/MetadataParser';
import { resourceCache } from '../services/ResourceCache';
import MiharaService from '../services/MiharaService';
import './ResourcesEnhanced.css';

// Add virtual scrolling imports
import { useVirtualizer } from '@tanstack/react-virtual';

// Types for hierarchical content organization
interface SubjectArea {
  name: string;
  description: string;
  icon: string;
  color: string;
  unitPlans: UnitPlan[];
  totalResources: number;
}

interface UnitPlan {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  lessons: LessonPlan[];
  resourceCount: number;
}

interface LessonPlan {
  id: string;
  title: string;
  objectives: string[];
  duration: number;
  resources: ParsedResource[];
}

type ViewMode = 'hierarchy' | 'grid' | 'list' | 'cards';

export default function ResourcesEnhanced() {
  // State management
  const [resources, setResources] = useState<ParsedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Mihara integration
  const miharaService = MiharaService.getInstance();
  const [miharaStatus, setMiharaStatus] = useState(miharaService.getStatus());
  const [migrationProgress, setMigrationProgress] = useState(miharaService.getMigrationProgress());

  // Navigation state
  const [viewMode, setViewMode] = useState<ViewMode>('hierarchy');
  const [selectedSubject, setSelectedSubject] = React.useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = React.useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = React.useState<string | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterMode, setFilterMode] = useState<
    'all' | 'culturally-aligned' | 'nzc-mapped' | 'recent'
  >('all');
  const [yearLevelFilter, setYearLevelFilter] = useState<string>('all');
  const [safetyFilter, setSafetyFilter] = useState<string>('all');

  // UI state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Virtual scrolling setup for large resource lists
  const parentRef = React.useRef<HTMLDivElement>(null!) as React.RefObject<HTMLDivElement>;

  // Optimize resource loading with chunking
  const loadResourcesInChunks = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔄 Starting to load resources from /resources/index.json');
      const parsed = await MetadataParser.parseResourcesFromIndex('/resources/index.json');
      console.log('📊 Loaded resources:', parsed.length);

      // Load resources in chunks to prevent UI blocking
      const chunkSize = 100;
      const chunks = [];
      for (let i = 0; i < parsed.length; i += chunkSize) {
        chunks.push(parsed.slice(i, i + chunkSize));
      }

      let loadedResources: ParsedResource[] = [];
      for (const chunk of chunks) {
        loadedResources = [...loadedResources, ...chunk];
        setResources([...loadedResources]);

        // Small delay to prevent UI blocking
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    } catch (err) {
      console.error('❌ Error loading resources:', err);
      setError(err instanceof Error ? err.message : 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  }, []);

  // Replace the existing useEffect with the optimized version
  useEffect(() => {
    loadResourcesInChunks();
  }, [loadResourcesInChunks]);

  // Transform flat resources into hierarchical structure
  const subjectAreas = useMemo(() => {
    const subjects: Record<string, SubjectArea> = {};

    resources.forEach((resource) => {
      const subject = resource.metadata.subject || 'General';

      if (!subjects[subject]) {
        subjects[subject] = {
          name: subject,
          description: getSubjectDescription(subject),
          icon: getSubjectIcon(subject),
          color: getSubjectColor(subject),
          unitPlans: [],
          totalResources: 0,
        };
      }

      subjects[subject].totalResources++;

      // Group by unit plans (simplified for demo)
      // In real implementation, this would be based on resource metadata
    });

    return Object.values(subjects);
  }, [resources]);

  // Filter resources based on current filters with caching
  const [filteredResources, setFilteredResources] = useState<ParsedResource[]>([]);
  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    const applyFilters = async () => {
      setFilterLoading(true);
      try {
        const filtered = await resourceCache.getFilteredResources(
          {
            searchQuery,
            filterMode,
            yearLevel: yearLevelFilter,
            safetyFilter,
          },
          resources,
        );
        setFilteredResources(filtered);
      } catch (error) {
        console.error('Error applying filters:', error);
        setFilteredResources(resources);
      } finally {
        setFilterLoading(false);
      }
    };

    applyFilters();
  }, [resources, searchQuery, filterMode, yearLevelFilter, safetyFilter]);

  // Virtual scrolling setup for large resource lists
  const virtualizer = useVirtualizer({
    count: filteredResources.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // Estimated height of each resource card
    overscan: 5, // Number of items to render outside viewport
  });

  const breadcrumbs = useMemo(() => {
    const crumbs: Array<{ label: string; path: string | null }> = [
      { label: 'All Subjects', path: null },
    ];
    if (selectedSubject) {
      crumbs.push({ label: selectedSubject, path: selectedSubject });
    }
    if (selectedUnit) {
      crumbs.push({ label: selectedUnit, path: `${selectedSubject}/${selectedUnit}` });
    }
    if (selectedLesson) {
      crumbs.push({
        label: selectedLesson,
        path: `${selectedSubject}/${selectedUnit}/${selectedLesson}`,
      });
    }
    return crumbs;
  }, [selectedSubject, selectedUnit, selectedLesson]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} />;

  // Show loading indicator for filter changes
  if (filterLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pounamu mx-auto mb-4"></div>
          <p className="text-lg">Applying filters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
                {/* Enhanced Header */}
          <header className="sticky top-0 z-50 border-b">
            <div className="container-wide px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-2 rounded-lg transition-colors lg:hidden"
                  >
                    ☰
                  </button>

                  <div>
                    <h1 className="text-2xl font-bold">Te Kete Ako Resources</h1>
                    <p className="text-sm">
                      {filteredResources.length.toLocaleString()} resources • {subjectAreas.length}{' '}
                      subject areas
                    </p>
                    {/* Mihara Status */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        🌟 Mihara Active
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {migrationProgress.progressPercentage.toFixed(1)}% Migrated
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                        {migrationProgress.culturalResources} Cultural Resources
                      </span>
                    </div>
                  </div>
                </div>

            <div className="flex items-center gap-3">
              {/* View Mode Selector */}
              <div className="flex rounded-lg border">
                {(['hierarchy', 'grid', 'list', 'cards'] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      viewMode === mode ? 'text-white' : 'text-gray-700 hover:text-white'
                    }`}
                    style={{
                      backgroundColor: viewMode === mode ? 'var(--color-pounamu)' : 'transparent',
                    }}
                  >
                    {mode === 'hierarchy'
                      ? '🌳'
                      : mode === 'grid'
                      ? '⊞'
                      : mode === 'list'
                      ? '☰'
                      : '📋'}
                  </button>
                ))}
              </div>

              <button
                className="px-4 py-2 rounded-lg font-medium transition-all"
                style={{
                  backgroundColor: 'var(--color-kowhai)',
                  color: 'white',
                }}
              >
                ➕ Add Resource
              </button>
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          {breadcrumbs.length > 1 && (
            <nav className="flex items-center gap-2 mt-4 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span style={{ color: 'var(--color-neutral-500)' }}>→</span>}
                  <button
                    onClick={() => {
                      if (index === 0) {
                        setSelectedSubject(null);
                        setSelectedUnit(null);
                        setSelectedLesson(null);
                      } else if (index === 1) {
                        setSelectedUnit(null);
                        setSelectedLesson(null);
                      } else if (index === 2) {
                        setSelectedLesson(null);
                      }
                    }}
                    className={`transition-colors ${
                      index === breadcrumbs.length - 1 ? 'font-medium' : 'hover:underline'
                    }`}
                    style={{
                      color:
                        index === breadcrumbs.length - 1
                          ? 'var(--color-primary)'
                          : 'var(--color-pounamu)',
                    }}
                  >
                    {crumb.label}
                  </button>
                </div>
              ))}
            </nav>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Advanced Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 h-screen transition-all duration-300 z-40 ${
            sidebarCollapsed ? 'w-0 lg:w-16' : 'w-80'
          }`}
        >
          <div className={`p-6 h-full overflow-y-auto ${sidebarCollapsed && 'lg:px-2'}`}>
            {!sidebarCollapsed && (
              <>
                {/* Search */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search resources, units, lessons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border transition-colors"
                  />
                </div>

                {/* Quick Filters */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Quick Filters</h3>
                  <div className="space-y-2">
                    {(
                      [
                        { key: 'all', label: '📚 All Resources', count: resources.length },
                        {
                          key: 'culturally-aligned',
                          label: '🌿 Culturally Aligned',
                          count: resources.filter((r) => r.metadata.culturalSafetyLevel === 'clean')
                            .length,
                        },
                        {
                          key: 'nzc-mapped',
                          label: '🎯 NZC Mapped',
                          count: resources.filter((r) => r.metadata.nzcAlignment?.length).length,
                        },
                        {
                          key: 'recent',
                          label: '🆕 Recently Added',
                          count: resources.filter(
                            (r) =>
                              new Date(r.modifiedAt) >
                              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                          ).length,
                        },
                      ] as const
                    ).map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setFilterMode(filter.key)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          filterMode === filter.key
                            ? 'text-white'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        style={{
                          backgroundColor:
                            filterMode === filter.key ? 'var(--color-pounamu)' : 'transparent',
                        }}
                      >
                        <span className="font-medium">{filter.label}</span>
                        <span className="text-sm opacity-75">{filter.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year Level Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Year Level</h3>
                  <select
                    value={yearLevelFilter}
                    onChange={(e) => setYearLevelFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border"
                    aria-label="Filter by year level"
                  >
                    <option value="all">All Year Levels</option>
                    {[
                      'Y1',
                      'Y2',
                      'Y3',
                      'Y4',
                      'Y5',
                      'Y6',
                      'Y7',
                      'Y8',
                      'Y9',
                      'Y10',
                      'Y11',
                      'Y12',
                      'Y13',
                    ].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cultural Safety Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Cultural Safety</h3>
                  <select
                    value={safetyFilter}
                    onChange={(e) => setSafetyFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border"
                    aria-label="Filter by cultural safety level"
                  >
                    <option value="all">All Safety Levels</option>
                    <option value="clean">🟢 Clean (Ready to Use)</option>
                    <option value="review">🟡 Needs Review</option>
                    <option value="consultation">🔴 Requires Consultation</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'lg:ml-16' : 'ml-0 lg:ml-80'
          }`}
        >
          <div className="p-6">
            {viewMode === 'hierarchy' && !selectedSubject && (
              <SubjectAreasView subjects={subjectAreas} onSelectSubject={setSelectedSubject} />
            )}

            {viewMode === 'hierarchy' && selectedSubject && !selectedUnit && (
              <UnitPlansView
                subjectName={selectedSubject}
                resources={filteredResources.filter((r) => r.metadata.subject === selectedSubject)}
                onSelectUnit={setSelectedUnit}
                onBack={() => setSelectedSubject(null)}
              />
            )}

            {viewMode === 'hierarchy' && selectedUnit && !selectedLesson && (
              <LessonPlansView
                unitName={selectedUnit}
                resources={filteredResources}
                onSelectLesson={setSelectedLesson}
                onBack={() => setSelectedUnit(null)}
              />
            )}

            {viewMode === 'hierarchy' && selectedLesson && (
              <ResourcesDetailView
                lessonName={selectedLesson}
                resources={filteredResources}
                onBack={() => setSelectedLesson(null)}
              />
            )}

            {viewMode === 'grid' && <GridView resources={filteredResources} />}

            {viewMode === 'list' && (
              <ListView
                resources={filteredResources}
                virtualizer={virtualizer}
                parentRef={parentRef}
              />
            )}

            {viewMode === 'cards' && <CardsView resources={filteredResources} />}
          </div>
        </main>
      </div>

      {/* Performance Monitor */}
      <PerformanceMonitor />

      {/* Migration Dashboard */}
      <MigrationDashboard />
    </div>
  );
}

// Subject Areas Overview
function SubjectAreasView({
  subjects,
  onSelectSubject,
}: {
  subjects: SubjectArea[];
  onSelectSubject: (subject: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Educational Subject Areas</h2>
        <p className="text-lg">Explore thousands of resources organized by curriculum areas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.name}
            onClick={() => onSelectSubject(subject.name)}
            className="group cursor-pointer rounded-xl border p-6 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: subject.color }}
              >
                {subject.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-pounamu transition-colors">
                  {subject.name}
                </h3>
                <p className="text-sm">{subject.totalResources} resources</p>
              </div>
            </div>

            <p className="text-sm mb-4">{subject.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: 'var(--color-pounamu)' }}>
                Explore Area →
              </span>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: 'var(--color-neutral-100)' }}
              >
                →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Unit Plans View (when subject is selected)
function UnitPlansView({
  subjectName,
  resources,
  onSelectUnit,
  onBack,
}: {
  subjectName: string;
  resources: ParsedResource[];
  onSelectUnit: (unit: string) => void;
  onBack: () => void;
}) {
  // Group resources by unit plans (simplified - in real app this would be metadata-driven)
  const units = useMemo(() => {
    const unitMap: Record<string, ParsedResource[]> = {};
    resources.forEach((resource) => {
      const unit = resource.metadata.curriculumArea || 'General Resources';
      if (!unitMap[unit]) {
        unitMap[unit] = [];
      }
      unitMap[unit].push(resource);
    });
    return Object.entries(unitMap).map(([name, resources]) => ({
      name,
      resources,
      count: resources.length,
    }));
  }, [resources]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 rounded-lg transition-colors">
          ← Back
        </button>
        <div>
          <h2 className="text-2xl font-bold">{subjectName} Unit Plans</h2>
          <p>
            {resources.length} resources across {units.length} units
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => (
          <div
            key={unit.name}
            onClick={() => onSelectUnit(unit.name)}
            className="cursor-pointer rounded-lg border p-6 transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-pounamu)' }}
              >
                <span className="text-white text-lg">📋</span>
              </div>
              <div>
                <h3 className="font-bold">{unit.name}</h3>
                <p className="text-sm">{unit.count} resources</p>
              </div>
            </div>

            <div className="space-y-2">
              {unit.resources.slice(0, 3).map((resource) => (
                <div key={resource.id} className="text-sm flex items-center gap-2">
                  <span>•</span>
                  <span className="truncate">{resource.title}</span>
                </div>
              ))}
              {unit.count > 3 && (
                <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
                  +{unit.count - 3} more resources
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Lesson Plans View (when unit is selected)
function LessonPlansView({
  unitName,
  resources,
  onSelectLesson,
  onBack,
}: {
  unitName: string;
  resources: ParsedResource[];
  onSelectLesson: (lesson: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 rounded-lg transition-colors">
          ← Back
        </button>
        <div>
          <h2 className="text-2xl font-bold">{unitName} - Lesson Plans</h2>
          <p>Individual lessons and activities</p>
        </div>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            onClick={() => onSelectLesson(resource.title)}
            className="cursor-pointer rounded-lg border p-6 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                <p className="text-sm mb-3">{resource.preview || 'No preview available'}</p>

                <div className="flex items-center gap-4 text-sm">
                  <span className="px-2 py-1 rounded-full">{resource.metadata.subject}</span>
                  <span className="px-2 py-1 rounded-full">{resource.metadata.yearLevel}</span>
                  <span
                    className={`px-2 py-1 rounded-full ${
                      resource.metadata.culturalSafetyLevel === 'clean'
                        ? 'bg-green-100 text-green-800'
                        : resource.metadata.culturalSafetyLevel === 'review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {resource.metadata.culturalSafetyIcon} {resource.metadata.culturalSafetyLevel}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
                  {new Date(resource.modifiedAt).toLocaleDateString()}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
                  {(resource.sizeBytes / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Resources Detail View (when lesson is selected)
function ResourcesDetailView({
  lessonName,
  resources,
  onBack,
}: {
  lessonName: string;
  resources: ParsedResource[];
  onBack: () => void;
}) {
  const lesson = resources.find((r) => r.title === lessonName);

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 rounded-lg transition-colors">
          ← Back
        </button>
        <div>
          <h2 className="text-2xl font-bold">{lesson.title}</h2>
          <p>Resources and materials for this lesson</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="prose max-w-none">
          <h3>Lesson Overview</h3>
          <p>{lesson.preview || 'No description available'}</p>

          <h3>Resource Details</h3>
          <ul>
            <li>
              <strong>Subject:</strong> {lesson.metadata.subject}
            </li>
            <li>
              <strong>Year Level:</strong>{' '}
              {Array.isArray(lesson.metadata.yearLevel)
                ? lesson.metadata.yearLevel.join(', ')
                : lesson.metadata.yearLevel}
            </li>
            <li>
              <strong>Cultural Safety:</strong> {lesson.metadata.culturalSafetyIcon}{' '}
              {lesson.metadata.culturalSafetyLevel}
            </li>
            <li>
              <strong>Last Modified:</strong> {new Date(lesson.modifiedAt).toLocaleDateString()}
            </li>
            <li>
              <strong>File Size:</strong> {(lesson.sizeBytes / 1024).toFixed(1)} KB
            </li>
          </ul>

          <div className="mt-6">
            <Link
              to={`/resource?path=${encodeURIComponent(lesson.relativePath)}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
              style={{
                backgroundColor: 'var(--color-pounamu)',
                color: 'white',
              }}
            >
              📖 View Resource
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid View for all resources
function GridView({ resources }: { resources: ParsedResource[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Resources - Grid View</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <Link
            key={resource.id}
            to={`/resource?path=${encodeURIComponent(resource.relativePath)}`}
            className="block rounded-lg border p-4 transition-all hover:shadow-lg"
          >
            <div
              className="aspect-square bg-gradient-to-br rounded-lg mb-4 flex items-center justify-center text-4xl"
              style={{
                backgroundImage: `linear-gradient(135deg, var(--color-pounamu), var(--color-kowhai))`,
              }}
            >
              📄
            </div>

            <h3 className="font-bold mb-2 line-clamp-2">{resource.title}</h3>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded-full text-xs">{resource.metadata.subject}</span>
                <span className="px-2 py-1 rounded-full text-xs">
                  {Array.isArray(resource.metadata.yearLevel)
                    ? resource.metadata.yearLevel.join(', ')
                    : resource.metadata.yearLevel}
                </span>
              </div>

              <div
                className="flex items-center justify-between text-xs"
                style={{ color: 'var(--color-neutral-500)' }}
              >
                <span>{new Date(resource.modifiedAt).toLocaleDateString()}</span>
                <span>{(resource.sizeBytes / 1024).toFixed(1)} KB</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// List View for compact display with virtual scrolling
function ListView({
  resources,
  virtualizer,
  parentRef,
}: {
  resources: ParsedResource[];
  virtualizer: {
    getTotalSize: () => number;
    getVirtualItems: () => Array<{
      index: number;
      size: number;
      start: number;
    }>;
  };
  parentRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        All Resources - List View ({resources.length.toLocaleString()} items)
      </h2>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium text-sm">
          <div className="col-span-4">Title</div>
          <div className="col-span-2">Subject</div>
          <div className="col-span-1">Year</div>
          <div className="col-span-2">Safety</div>
          <div className="col-span-2">Modified</div>
          <div className="col-span-1">Size</div>
        </div>

        <div ref={parentRef} className="max-h-96 overflow-auto">
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const resource = resources[virtualRow.index];
              if (!resource) return null;

              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <Link
                    to={`/resource?path=${encodeURIComponent(resource.relativePath)}`}
                    className="grid grid-cols-12 gap-4 p-4 border-b hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-4">
                      <h3 className="font-medium line-clamp-1">{resource.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-1">{resource.preview}</p>
                    </div>
                    <div className="col-span-2 text-sm">{resource.metadata.subject}</div>
                    <div className="col-span-1 text-sm">
                      {Array.isArray(resource.metadata.yearLevel)
                        ? resource.metadata.yearLevel.join(', ')
                        : resource.metadata.yearLevel}
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          resource.metadata.culturalSafetyLevel === 'clean'
                            ? 'bg-green-100 text-green-800'
                            : resource.metadata.culturalSafetyLevel === 'review'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {resource.metadata.culturalSafetyIcon}{' '}
                        {resource.metadata.culturalSafetyLevel}
                      </span>
                    </div>
                    <div
                      className="col-span-2 text-sm"
                      style={{ color: 'var(--color-neutral-600)' }}
                    >
                      {new Date(resource.modifiedAt).toLocaleDateString()}
                    </div>
                    <div
                      className="col-span-1 text-sm"
                      style={{ color: 'var(--color-neutral-600)' }}
                    >
                      {(resource.sizeBytes / 1024).toFixed(1)} KB
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Cards View for detailed preview
function CardsView({ resources }: { resources: ParsedResource[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Resources - Card View</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg border p-6">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: 'var(--color-pounamu)' }}
              >
                📄
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                <p className="text-sm mb-3 line-clamp-2">
                  {resource.preview || 'No preview available'}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 rounded-full text-xs">
                    {resource.metadata.subject}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs">
                    {Array.isArray(resource.metadata.yearLevel)
                      ? resource.metadata.yearLevel.join(', ')
                      : resource.metadata.yearLevel}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      resource.metadata.culturalSafetyLevel === 'clean'
                        ? 'bg-green-100 text-green-800'
                        : resource.metadata.culturalSafetyLevel === 'review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {resource.metadata.culturalSafetyIcon} {resource.metadata.culturalSafetyLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
                    {new Date(resource.modifiedAt).toLocaleDateString()} •{' '}
                    {(resource.sizeBytes / 1024).toFixed(1)} KB
                  </div>

                  <Link
                    to={`/resource?path=${encodeURIComponent(resource.relativePath)}`}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: 'var(--color-pounamu)',
                      color: 'white',
                    }}
                  >
                    View Resource
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Loading skeleton
function LoadingSkeleton() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-20 border-b">
          <div className="container-wide px-6 py-4">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="flex">
          <div className="w-80 h-screen bg-white border-r p-6">
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error display
function ErrorDisplay({ error }: { error: string }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-error)' }}>
          Failed to Load Resources
        </h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-lg font-medium"
          style={{
            backgroundColor: 'var(--color-pounamu)',
            color: 'white',
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

// Helper functions
function getSubjectDescription(subject: string): string {
  const descriptions: Record<string, string> = {
    Mathematics: 'Number, algebra, geometry, statistics and probability resources aligned with NZC',
    Science: 'Living world, planet earth, physical and material world investigations',
    English: 'Reading, writing, speaking, listening and visual language resources',
    'Social Studies': 'Identity, culture, place, time and change explorations',
    'Te Reo Māori': 'Indigenous language learning and cultural knowledge resources',
    Technology: 'Digital technologies and technological practice resources',
    Health: 'Physical health, mental wellbeing and safety education',
    Arts: 'Visual arts, music, drama and dance creative resources',
  };
  return descriptions[subject] || 'Educational resources for this subject area';
}

function getSubjectIcon(subject: string): string {
  const icons: Record<string, string> = {
    Mathematics: '🔢',
    Science: '🔬',
    English: '📚',
    'Social Studies': '🌍',
    'Te Reo Māori': '🌿',
    Technology: '💻',
    Health: '💪',
    Arts: '🎨',
  };
  return icons[subject] || '📖';
}

function getSubjectColor(subject: string): string {
  const colors: Record<string, string> = {
    Mathematics: 'var(--color-moana)',
    Science: 'var(--color-pounamu)',
    English: 'var(--color-kowhai)',
    'Social Studies': 'var(--color-primary)',
    'Te Reo Māori': 'var(--color-pounamu-light)',
    Technology: 'var(--color-kahurangi)',
    Health: 'var(--color-success)',
    Arts: 'var(--color-deep-purple)',
  };
  return colors[subject] || 'var(--color-neutral-600)';
}
