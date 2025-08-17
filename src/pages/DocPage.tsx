import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LightweightMarkdown from '../components/LightweightMarkdown';

const defaultDocs = [
  {
    title: 'The Great Migration – Eternal Legacy',
    path: 'docs/THE_GREAT_MIGRATION_ETERNAL_LEGACY.md',
  },
  { title: 'Session Knowledge Update', path: 'SESSION_KNOWLEDGE_UPDATE.md' },
];

export default function DocPage() {
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!path) {
        setError('No document specified');
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/${path}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const text = await res.text();
        setContent(text);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [path]);

  if (!path) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="text-indigo-600 hover:underline">
          ← Home
        </Link>
        <h1 className="text-2xl font-bold mt-4">Project Documents</h1>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          {defaultDocs.map((d) => (
            <li key={d.path}>
              <Link
                to={`/docs?path=${encodeURIComponent(d.path)}`}
                className="text-indigo-600 hover:underline"
              >
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-indigo-600 hover:underline">
        ← Home
      </Link>
      <div className="mt-4 bg-white rounded-lg border p-4">
        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <article className="prose max-w-none">
            <LightweightMarkdown content={content} />
          </article>
        )}
      </div>
    </div>
  );
}
