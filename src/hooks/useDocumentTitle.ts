import { useEffect, useRef } from 'react';

const DEFAULT_TITLE = 'Mohammed Matheen';

export function useDocumentTitle(title?: string) {
  const previous = useRef<string | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    if (previous.current === null) {
      previous.current = document.title || DEFAULT_TITLE;
    }

    if (title && title.trim()) {
      document.title = title.trim();
    } else {
      document.title = DEFAULT_TITLE;
    }

    return () => {
      if (typeof document === 'undefined') return;
      if (previous.current) {
        document.title = previous.current;
      } else {
        document.title = DEFAULT_TITLE;
      }
    };
  }, [title]);
}

export default useDocumentTitle;
