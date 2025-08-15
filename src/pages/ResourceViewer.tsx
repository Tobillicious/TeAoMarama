import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function ResourceViewer() {
  const [searchParams] = useSearchParams();
  const srcPath = searchParams.get('path');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      if (!srcPath) {
        setError('No resource specified');
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/${srcPath}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to fetch resource: ${res.status}`);
        const text = await res.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [srcPath]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/resources" className="text-indigo-600 hover:underline">← Back to Resources</Link>
      <div className="mt-4 bg-white rounded-lg border p-4">
        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <pre className="whitespace-pre-wrap text-sm leading-6">{content}</pre>
        )}
      </div>
    </div>
  );
}


