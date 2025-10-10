import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { pocketbaseClient } from '@/utils/pocketbaseClient';

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
      const perPage = pagination?.pageSize || 50;

      // Construir filtro string do PocketBase
      let filterString = '';
      if (filters && Object.keys(filters).length > 0) {
        const searchMode = filters._searchMode;
        const filterParts = Object.entries(filters)
          .filter(([key]) => key !== '_searchMode')
          .map(([key, value]) => {
            // Se for o campo nome e modo de busca for 'contains', usar LIKE
            if (key === 'nome' && searchMode === 'contains') {
              return `${key} ~ "${value}"`;
            }
            // Caso contrário, busca exata
            return `${key} = "${value}"`;
          });
        filterString = filterParts.join(' && ');
      }

      // Construir opções de query - começar vazio
      const pbOptions: any = {};

      // Só adicionar filtro se não estiver vazio
      if (filterString) {
        pbOptions.filter = filterString;
      }

      // Só adicionar sort se fornecido
      if (sort) {
        pbOptions.sort = sort;
      }

      try {
        const result = await pocketbaseClient
          .collection(resource)
          .getList(page, perPage, pbOptions);

        return {
          data: result.items as T[],
          total: result.totalItems,
          page: result.page,
          perPage: result.perPage,
        };
      } catch (error: any) {
        console.error('PocketBase Query Error:', error);
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
      const data = await pocketbaseClient.collection(resource).getOne(id);
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

      const filterString = ids.map(id => `id = "${id}"`).join(' || ');

      const result = await pocketbaseClient
        .collection(resource)
        .getList(1, ids.length, {
          filter: filterString,
        });

      return result.items as T[];
    },
    enabled: ids && ids.length > 0,
    ...queryOptions,
  });
}
