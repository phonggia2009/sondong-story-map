import { useQuery } from '@tanstack/react-query';
import { fetchVillages } from '@/services/dataService';
import type { Village } from '@/types';

const VILLAGES_QUERY_KEY = ['villages'] as const;

// ============================================================
//  useVillages Hook
//  Fetches and caches village data via React Query.
// ============================================================

export function useVillages() {
  const query = useQuery({
    queryKey: VILLAGES_QUERY_KEY,
    queryFn: fetchVillages,
    staleTime: 5 * 60 * 1000,   // 5 minutes
    gcTime: 30 * 60 * 1000,     // 30 minutes
    retry: 2,
    retryDelay: 1000,
  });

  return {
    villages:   query.data ?? [],
    isLoading:  query.isLoading,
    isError:    query.isError,
    error:      query.error as Error | null,
    refetch:    query.refetch,
  };
}

// ============================================================
//  useVillageById Hook
// ============================================================

export function useVillageById(id: number | null) {
  const { villages } = useVillages();
  if (id === null) return null;
  return villages.find((v: Village) => v.id === id) ?? null;
}
