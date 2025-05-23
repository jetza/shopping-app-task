import { useEffect, useState } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchFunction();
        setData(res);
      } catch (err: any) {
        setError(err?.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFunction]);

  return { data, loading, error };
};

export default useFetch;
