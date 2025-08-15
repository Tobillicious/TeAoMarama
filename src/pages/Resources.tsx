import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type ResourceItem = {
  id: string;
  title: string;
  relativePath: string;
  category: string;
  sizeBytes: number;
  modifiedAt: string;
};

export default function Resources() {
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadIndex() {
      try {
        const res = await fetch('/resources/index.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load index.json: ${res.status}`);
        const data = await res.json();
        setItems(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    loadIndex();
  }, []);

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Educational Resources</h1>
      {loading && <p>Loading resources…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="space-y-8">
          {categories.map(cat => (
            <section key={cat}>
              <h2 className="text-xl font-semibold mb-3 capitalize">{cat.replace(/[_-]/g, ' ')}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.filter(i => i.category === cat).map(item => (
                  <Link
                    key={item.id}
                    to={`/resource?path=${encodeURIComponent(item.relativePath)}`}
                    className="block border rounded-lg p-4 hover:border-indigo-400 hover:shadow-md transition"
                  >
                    <div className="text-sm text-gray-500 mb-1">{new Date(item.modifiedAt).toLocaleString()}</div>
                    <div className="font-medium text-indigo-700 mb-1">{item.title}</div>
                    <div className="text-xs text-gray-500">{(item.sizeBytes/1024).toFixed(1)} KB</div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}


