import React, { useEffect, useState } from 'react';
import { simpleContentLoader, SimpleResource } from '../utils/simple-content-loader';

const SimpleContentBrowser: React.FC = () => {
  const [resources, setResources] = useState<SimpleResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedResource, setSelectedResource] = useState<SimpleResource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setLoading(true);
    setError('');

    try {
      const loadedResources = await simpleContentLoader.loadAllResources();
      setResources(loadedResources);
      setStats(simpleContentLoader.getStats());
    } catch (err) {
      setError(`Failed to load resources: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadResources();
      return;
    }

    setLoading(true);
    try {
      const searchResults = await simpleContentLoader.searchResources(searchQuery);
      setResources(searchResults);
    } catch (err) {
      setError(`Search failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            📚 Simple Content Browser
          </h1>
          <p className="text-xl text-gray-300">
            Browse actual educational resources (working version)
          </p>
        </div>

        {/* Stats Section */}
        {stats && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">📊 Content Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
                <div className="text-sm text-gray-400">Total Resources</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{stats.culturalResources}</div>
                <div className="text-sm text-gray-400">Cultural Resources</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {Object.keys(stats.byCategory).length}
                </div>
                <div className="text-sm text-gray-400">Categories</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {Object.keys(stats.bySubject).length}
                </div>
                <div className="text-sm text-gray-400">Subjects</div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search resources..."
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              🔍 Search
            </button>
            <button
              onClick={loadResources}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <div className="text-red-400 font-semibold">Error:</div>
            <div className="text-red-300">{error}</div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <div className="mt-4 text-gray-400">Loading resources...</div>
          </div>
        )}

        {/* Resources Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                onClick={() => setSelectedResource(resource)}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-blue-400/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl">
                    {resource.category === 'lesson-plan'
                      ? '📝'
                      : resource.category === 'assessment'
                      ? '📊'
                      : resource.category === 'activity'
                      ? '🎯'
                      : resource.category === 'handout'
                      ? '📄'
                      : resource.category === 'multimedia'
                      ? '🎬'
                      : resource.category === 'unit-plan'
                      ? '📋'
                      : '📚'}
                  </div>
                  {resource.culturalElements && <div className="text-green-400 text-sm">🌿</div>}
                </div>

                <h3 className="text-xl font-bold mb-2 text-blue-400">{resource.title}</h3>

                <div className="space-y-2 text-sm text-gray-300">
                  <div>
                    <strong>Subject:</strong> {resource.subject}
                  </div>
                  <div>
                    <strong>Year Level:</strong> {resource.yearLevel}
                  </div>
                  <div>
                    <strong>Category:</strong> {resource.category.replace('-', ' ')}
                  </div>
                  <div>
                    <strong>Size:</strong> {Math.round(resource.size / 1024)}KB
                  </div>
                  <div>
                    <strong>Path:</strong> {resource.filePath}
                  </div>
                </div>

                {resource.tags && resource.tags.length > 0 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          +{resource.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📚</div>
            <div className="text-xl text-gray-400 mb-2">No resources found</div>
            <div className="text-gray-500">Try adjusting your search or refresh the page</div>
          </div>
        )}

        {/* Resource Detail Modal */}
        {selectedResource && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-blue-400">{selectedResource.title}</h2>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-green-400">Resource Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Subject:</strong> {selectedResource.subject}
                    </div>
                    <div>
                      <strong>Year Level:</strong> {selectedResource.yearLevel}
                    </div>
                    <div>
                      <strong>Category:</strong> {selectedResource.category}
                    </div>
                    <div>
                      <strong>File Path:</strong> {selectedResource.filePath}
                    </div>
                    <div>
                      <strong>Size:</strong> {Math.round(selectedResource.size / 1024)}KB
                    </div>
                    <div>
                      <strong>Last Modified:</strong>{' '}
                      {new Date(selectedResource.lastModified).toLocaleDateString()}
                    </div>
                    {selectedResource.culturalElements && (
                      <div className="text-green-400">
                        <strong>🌿 Cultural Elements:</strong> Included
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-400">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedResource.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {selectedResource.content && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-orange-400">Content Preview</h3>
                  <div className="bg-white/5 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                      {selectedResource.content.substring(0, 1000)}
                      {selectedResource.content.length > 1000 && '...'}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">📚 Simple Content Browser - Actually working version</p>
          <p className="text-sm">
            This browser loads and displays real content files from the platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleContentBrowser;
