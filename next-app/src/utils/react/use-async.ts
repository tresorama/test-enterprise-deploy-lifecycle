'use client';

import { useEffect, useState } from "react";

export type AsyncOutput<TData> = (
  | { status: 'idle', data: null; }
  | { status: 'loading', data: null; }
  | { status: 'error', data: null; }
  | { status: 'success', data: TData; }
);

export function useAsync<TData>({
  fetchFn
}: {
  fetchFn: () => Promise<TData>,
}) {
  const [data, setData] = useState<null | TData>(null);
  const [status, setStatus] = useState<AsyncOutput<TData>['status']>('idle');

  useEffect(
    () => {
      const ac = new AbortController();
      async function getData() {
        try {
          setStatus('loading');
          const data = await fetchFn();
          setData(data);
          setStatus('success');
        } catch (error) {
          setStatus('error');
        }
      }
      getData();
      return () => {
        ac.abort();
      };
    },
    []
  );

  return {
    status,
    data,
  } as AsyncOutput<TData>;
}