import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Delay sonrasında değeri güncelle
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: yeni value gelirse eski timeout'u iptal et
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}