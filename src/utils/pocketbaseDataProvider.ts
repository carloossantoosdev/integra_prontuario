import type {
  BaseRecord,
  CrudFilters,
  CrudSorting,
  DataProvider,
  GetListResponse,
  GetOneResponse,
  CreateResponse,
  UpdateResponse,
  DeleteOneResponse,
  HttpError,
  Pagination,
} from '@refinedev/core';
import type {
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteOneParams,
} from '@refinedev/core';
import { pocketbaseClient } from './pocketbaseClient';
import type { RecordOptions } from 'pocketbase';

function buildFilter(filters?: CrudFilters): string {
  if (!filters || filters.length === 0) return '';

  const filterParts: string[] = [];

  filters.forEach(filter => {
    if (
      (filter as any).operator === 'or' ||
      (filter as any).operator === 'and'
    ) {
      // Para filtros compostos, implementar conforme necessário
      return;
    }

    if (!('field' in filter)) return;
    const { field, operator, value } = filter as any;

    switch (operator) {
      case 'eq':
        filterParts.push(`${field} = "${value}"`);
        break;
      case 'ne':
        filterParts.push(`${field} != "${value}"`);
        break;
      case 'gt':
        filterParts.push(`${field} > "${value}"`);
        break;
      case 'gte':
        filterParts.push(`${field} >= "${value}"`);
        break;
      case 'lt':
        filterParts.push(`${field} < "${value}"`);
        break;
      case 'lte':
        filterParts.push(`${field} <= "${value}"`);
        break;
      case 'in':
        if (Array.isArray(value)) {
          const valuesList = value.map(v => `"${v}"`).join(',');
          filterParts.push(`${field} in (${valuesList})`);
        }
        break;
      case 'nin':
        if (Array.isArray(value)) {
          const valuesList = value.map(v => `"${v}"`).join(',');
          filterParts.push(`${field} not in (${valuesList})`);
        }
        break;
      case 'contains':
        filterParts.push(`${field} ~ "${value}"`);
        break;
      case 'containss':
        filterParts.push(`${field} ~ "${value}"`);
        break;
      case 'startswith':
        filterParts.push(`${field} ~ "${value}%"`);
        break;
      case 'endswith':
        filterParts.push(`${field} ~ "%${value}"`);
        break;
      default:
        break;
    }
  });

  return filterParts.join(' && ');
}

function buildSort(sorters?: CrudSorting): string {
  if (!sorters || sorters.length === 0) return '';

  return sorters
    .map(sort => `${sort.order === 'desc' ? '-' : ''}${sort.field}`)
    .join(',');
}

export const pocketbaseDataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>(
    params: GetListParams
  ): Promise<GetListResponse<TData>> => {
    const { resource, filters, sorters, pagination } = params;

    const options: RecordOptions = {};

    // Filtros
    const filter = buildFilter(filters);
    if (filter) options.filter = filter;

    // Ordenação
    const sort = buildSort(sorters);
    if (sort) options.sort = sort;

    // Paginação
    if (pagination?.current && pagination?.pageSize) {
      options.page = pagination.current;
      options.perPage = pagination.pageSize;
    } else {
      // Valores padrão se não houver paginação
      options.page = 1;
      options.perPage = 50;
    }

    try {
      const result = await pocketbaseClient
        .collection(resource)
        .getList(1, 50, options);

      return {
        data: result.items.map(
          item =>
            ({
              ...item,
            }) as unknown as TData
        ),
        total: result.totalItems,
      };
    } catch (error: any) {
      throw {
        statusCode: error.status || 500,
        message: error.message || 'Erro ao buscar registros',
      } as HttpError;
    }
  },

  getOne: async <TData extends BaseRecord = BaseRecord>(
    params: GetOneParams
  ): Promise<GetOneResponse<TData>> => {
    const { resource, id } = params;

    try {
      const record = await pocketbaseClient
        .collection(resource)
        .getOne(String(id));

      return {
        data: record as unknown as TData,
      };
    } catch (error: any) {
      throw {
        statusCode: error.status || 404,
        message: error.message || 'Registro não encontrado',
      } as HttpError;
    }
  },

  create: async <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: CreateParams<TVariables>
  ): Promise<CreateResponse<TData>> => {
    const { resource, variables } = params;

    try {
      const record = await pocketbaseClient
        .collection(resource)
        .create(variables as any);

      return {
        data: record as unknown as TData,
      };
    } catch (error: any) {
      throw {
        statusCode: error.status || 400,
        message: error.message || 'Erro ao criar registro',
      } as HttpError;
    }
  },

  update: async <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: UpdateParams<TVariables>
  ): Promise<UpdateResponse<TData>> => {
    const { resource, id, variables } = params;

    try {
      const record = await pocketbaseClient
        .collection(resource)
        .update(String(id), variables as any);

      return {
        data: record as unknown as TData,
      };
    } catch (error: any) {
      throw {
        statusCode: error.status || 400,
        message: error.message || 'Erro ao atualizar registro',
      } as HttpError;
    }
  },

  deleteOne: async <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: DeleteOneParams<TVariables>
  ): Promise<DeleteOneResponse<TData>> => {
    const { resource, id } = params;

    // Exclusão em cascata para pacientes → evolucao_rcp/evolucao_dnm
    if (resource === 'pacientes') {
      try {
        const collectionsToCascade = ['evolucao_rcp', 'evolucao_dnm'];

        for (const collectionName of collectionsToCascade) {
          const relatedRecords = await pocketbaseClient
            .collection(collectionName)
            .getList(1, 50, {
              filter: `patient_id = "${id}"`,
            });

          // Deletar registros relacionados
          for (const record of relatedRecords.items) {
            await pocketbaseClient.collection(collectionName).delete(record.id);
          }
        }
      } catch (e) {
        console.error('[PocketBase] Erro ao excluir evoluções vinculadas:', e);
      }
    }

    try {
      await pocketbaseClient.collection(resource).delete(String(id));

      return {
        data: { id } as unknown as TData,
      };
    } catch (error: any) {
      throw {
        statusCode: error.status || 400,
        message: error.message || 'Erro ao deletar registro',
      } as HttpError;
    }
  },

  getApiUrl: () => pocketbaseClient.baseUrl,

  custom: async () => ({ data: [] as any }),
};

export default pocketbaseDataProvider;
