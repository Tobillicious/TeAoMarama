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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Educational Resources</h1>
      <p className="text-gray-600 mb-6">Browse {resources.length.toLocaleString()} items. Use search and filters to narrow down.</p>

      {/* Controls */}
      <div className="bg-white border rounded-lg p-4 mb-8 grid gap-3 md:grid-cols-5">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by title, content, tags…"
          className="md:col-span-2 border rounded px-3 py-2"
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded px-3 py-2">
          {categories.map(c => (
            <option key={c} value={c}>{c === 'all' ? 'All categories' : c}</option>
          ))}
        </select>
        <select value={subject} onChange={e => setSubject(e.target.value)} className="border rounded px-3 py-2">
          {subjects.map(s => (
            <option key={s} value={s}>{s === 'all' ? 'All subjects' : s}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <select value={yearLevel} onChange={e => setYearLevel(e.target.value)} className="flex-1 border rounded px-3 py-2">
            {years.map(y => (
              <option key={y} value={y}>{y === 'all' ? 'All years' : y}</option>
            ))}
          </select>
          <select value={safety} onChange={e => setSafety(e.target.value as unknown)} className="flex-1 border rounded px-3 py-2">
            <option value="all">All safety</option>
            <option value="clean">🟢 Clean</option>
            <option value="review">🟡 Review</option>
            <option value="consultation">🔴 Consultation</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading resources…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <>
          <div className="text-sm text-gray-600 mb-4">Showing {filtered.length.toLocaleString()} result(s)</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(item => (
              <Link
                key={item.id}
                to={`/resource?path=${encodeURIComponent(item.relativePath)}`}
                className="block border rounded-lg p-4 hover:border-indigo-400 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{new Date(item.modifiedAt).toLocaleDateString()}</span>
                  <span>{(item.sizeBytes/1024).toFixed(1)} KB</span>
                </div>
                <div className="font-semibold text-indigo-700 mb-1">{item.title}</div>
                <div className="text-xs text-gray-600 mb-2 flex gap-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-gray-100 rounded">{item.metadata.subject}</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded">{item.metadata.yearLevel}</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded">{item.metadata.culturalSafetyIcon} {item.metadata.culturalSafetyLevel}</span>
                </div>
                {item.preview && (
                  <div className="text-sm text-gray-700 line-clamp-3">{item.preview}</div>
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

