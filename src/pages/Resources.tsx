import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MetadataParser, type ParsedResource } from '../services/MetadataParser';

export default function Resources() {
  const [resources, setResources] = useState<ParsedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [subject, setSubject] = useState<string>('all');
  const [yearLevel, setYearLevel] = useState<string>('all');
  const [safety, setSafety] = useState<'all' | 'clean' | 'review' | 'consultation'>('all');

  useEffect(() => {
    async function load() {
      try {
        const parsed = await MetadataParser.parseResourcesFromIndex('/resources/index.json');
        setResources(parsed);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load resources');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(resources.map(r => r.category)))],
    [resources]
  );
  const subjects = useMemo(
    () => ['all', ...Array.from(new Set(resources.map(r => r.metadata.subject)))],
    [resources]
  );
  const years = useMemo(
    () => ['all', ...Array.from(new Set(resources.map(r => r.metadata.yearLevel)))],
    [resources]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter(r => {
      if (category !== 'all' && r.category !== category) return false;
      if (subject !== 'all' && r.metadata.subject !== subject) return false;
      if (yearLevel !== 'all' && r.metadata.yearLevel !== yearLevel) return false;
      if (safety !== 'all' && r.metadata.culturalSafetyLevel !== safety) return false;
      if (!q) return true;
      return (
        r.searchableText?.includes?.(q) ||
        r.title.toLowerCase().includes(q) ||
        r.relativePath.toLowerCase().includes(q)
      );
    });
  }, [resources, query, category, subject, yearLevel, safety]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-amber-50">
      {/* Gorgeous Hero Section */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
              📚 Whaowhia te Kete Mātauranga
            </h1>
            <p className="text-xl mb-8 text-emerald-100 max-w-3xl mx-auto">
              *Fill the Basket of Knowledge* - {resources.length.toLocaleString()} culturally-integrated resources for New Zealand educators
            </p>
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-yellow-300">{resources.length.toLocaleString()}</div>
                <div className="text-sm text-emerald-200 uppercase tracking-wide">Total Resources</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-yellow-300">{subjects.length - 1}</div>
                <div className="text-sm text-emerald-200 uppercase tracking-wide">Subject Areas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-yellow-300">{years.length - 1}</div>
                <div className="text-sm text-emerald-200 uppercase tracking-wide">Year Levels</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center">🔍 Kimi Taonga - Search Resources</h2>
          
          {/* Search Bar */}
          <div className="mb-6">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by title, content, cultural themes, curriculum alignment..."
              className="w-full px-6 py-4 text-lg border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-all shadow-inner"
            />
          </div>

          {/* Filter Grid */}
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-emerald-700 mb-2 uppercase tracking-wide">📂 Category</label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:ring focus:ring-emerald-200 bg-white"
              >
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c === 'all' ? '📋 All Categories' : `📁 ${c}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-700 mb-2 uppercase tracking-wide">🎯 Subject</label>
              <select 
                value={subject} 
                onChange={e => setSubject(e.target.value)} 
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:ring focus:ring-emerald-200 bg-white"
              >
                {subjects.map(s => (
                  <option key={s} value={s}>
                    {s === 'all' ? '📚 All Subjects' : `📖 ${s}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-700 mb-2 uppercase tracking-wide">🎓 Year Level</label>
              <select 
                value={yearLevel} 
                onChange={e => setYearLevel(e.target.value)} 
                className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:ring focus:ring-emerald-200 bg-white"
              >
                {years.map(y => (
                  <option key={y} value={y}>
                    {y === 'all' ? '🎯 All Year Levels' : `📊 ${y}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-emerald-700 mb-2 uppercase tracking-wide">🛡️ Cultural Safety</label>
              <select 
                value={safety} 
                onChange={e => setSafety(e.target.value as any)} 
                className="w-full px-4 py-3 border-2 border-amber-200 border-l-4 border-l-amber-400 rounded-lg focus:border-amber-500 focus:ring focus:ring-amber-200 bg-white"
              >
                <option value="all">🌟 All Safety Levels</option>
                <option value="clean">🟢 Culturally Safe</option>
                <option value="review">🟡 Requires Review</option>
                <option value="consultation">🔴 Iwi Consultation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="inline-block w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
            <p className="text-lg text-emerald-700 italic">Loading taonga mātauranga...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16 bg-red-50 border border-red-200 rounded-2xl">
            <div className="text-red-600 text-lg font-semibold">❌ {error}</div>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {/* Results Header */}
            <div className="text-center mb-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                🎯 Found {filtered.length.toLocaleString()} resources
              </h3>
              <p className="text-emerald-600">
                Each resource has been culturally reviewed and curriculum-aligned for New Zealand schools
              </p>
            </div>

            {/* Resource Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(item => (
                <Link
                  key={item.id}
                  to={`/resource?path=${encodeURIComponent(item.relativePath)}`}
                  className="group block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>📅 {new Date(item.modifiedAt).toLocaleDateString()}</div>
                        <div>📊 {(item.sizeBytes/1024).toFixed(1)} KB</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.metadata.culturalSafetyLevel === 'clean' ? 'bg-green-100 text-green-800' :
                        item.metadata.culturalSafetyLevel === 'review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.metadata.culturalSafetyIcon} {item.metadata.culturalSafetyLevel}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-emerald-800 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {item.title}
                    </h4>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                        📚 {item.metadata.subject}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        🎓 {item.metadata.yearLevel}
                      </span>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                        📂 {item.category}
                      </span>
                    </div>

                    {/* Preview */}
                    {item.preview && (
                      <div className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {item.preview}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-blue-50 border-t border-emerald-100">
                    <span className="text-sm font-semibold text-emerald-700 group-hover:text-emerald-600 transition-colors">
                      👁️ View Resource →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results */}
            {filtered.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-emerald-800 mb-2">No resources found</h3>
                <p className="text-emerald-600">Try adjusting your search terms or filters to find what you're looking for.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}