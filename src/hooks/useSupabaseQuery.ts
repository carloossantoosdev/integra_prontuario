import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabaseClient } from '@/utils/supabaseClient';

interface UseListOptions {
  resource: string;
  filters?: Record<string, any>;
  sort?: string;
  pagination?: {
    current?: number;
    pageSize?: number;
  };
}

export function useList<T = any>(
  options: UseListOptions,
  queryOptions?: Omit<UseQueryOptions<any, Error>, 'queryKey' | 'queryFn'>
) {
  const { resource, filters, sort, pagination } = options;

  return useQuery({
    queryKey: ['list', resource, filters, sort, pagination],
    queryFn: async () => {
      const page = pagination?.current || 1;
      const pageSize = pagination?.pageSize || 50;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabaseClient.from(resource).select('*', { count: 'exact' });

      // Aplicar filtros
      if (filters && Object.keys(filters).length > 0) {
        const searchMode = filters._searchMode;
        Object.entries(filters)
          .filter(([key]) => key !== '_searchMode')
          .forEach(([key, value]) => {
            // Se for o campo nome e modo de busca for 'contains', usar ilike
            if (key === 'nome' && searchMode === 'contains') {
              query = query.ilike(key, `%${value}%`);
            } else {
              // Caso contrário, busca exata
              query = query.eq(key, value);
            }
          });
      }

      // Aplicar ordenação
      if (sort) {
        const sortParts = sort.split(',');
        sortParts.forEach((sortPart, index) => {
          const isDesc = sortPart.startsWith('-');
          const field = isDesc ? sortPart.substring(1) : sortPart;
          query = query.order(field, {
            ascending: !isDesc,
            nullsFirst: false,
          });
        });
      }

      // Aplicar paginação
      query = query.range(from, to);

      try {
        const { data, error, count } = await query;

        if (error) {
          throw new Error(error.message || 'Erro ao buscar dados');
        }

        return {
          data: (data || []) as T[],
          total: count || 0,
          page,
          perPage: pageSize,
        };
      } catch (error: any) {
        console.error('Supabase Query Error:', error);
        throw new Error(error?.message || 'Erro ao buscar dados');
      }
    },
    ...queryOptions,
  });
}

export function useOne<T = any>(
  resource: string,
  id: string | undefined,
  queryOptions?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['one', resource, id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required');
      const { data, error } = await supabaseClient
        .from(resource)
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message || 'Erro ao buscar registro');
      }

      return data as T;
    },
    enabled: !!id,
    ...queryOptions,
  });
}

export function useMany<T = any>(
  resource: string,
  ids: string[],
  queryOptions?: Omit<UseQueryOptions<T[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['many', resource, ids],
    queryFn: async () => {
      if (!ids || ids.length === 0) return [];

      const { data, error } = await supabaseClient
        .from(resource)
        .select('*')
        .in('id', ids);

      if (error) {
        throw new Error(error.message || 'Erro ao buscar registros');
      }

      return (data || []) as T[];
    },
    enabled: ids && ids.length > 0,
    ...queryOptions,
  });
}

