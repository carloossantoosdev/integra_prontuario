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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit as fbLimit,
  orderBy as fbOrderBy,
  query as fbQuery,
  serverTimestamp,
  updateDoc,
  where as fbWhere,
} from 'firebase/firestore';
import { db } from './firebaseClient';

type FirestoreRecord = BaseRecord & Record<string, unknown>;

function buildQuery(
  resource: string,
  filters?: CrudFilters,
  sorters?: CrudSorting,
  pagination?: Pagination
) {
  const constraints: any[] = [];

  // Filters
  filters?.forEach(filter => {
    if (
      (filter as any).operator === 'or' ||
      (filter as any).operator === 'and'
    ) {
      // Simplificação: Refine fornece filtros compostos; Firestore não tem OR arbitrário sem in/array-contains-any.
      // Para casos simples, ignore aqui e trate no cliente, ou ajuste o model.
      return;
    }
    if (!('field' in filter)) return;
    const { field, operator, value } = filter as any;
    switch (operator) {
      case 'eq':
        constraints.push(fbWhere(field as string, '==', value));
        break;
      case 'ne':
        constraints.push(fbWhere(field as string, '!=', value));
        break;
      case 'gt':
        constraints.push(fbWhere(field as string, '>', value));
        break;
      case 'gte':
        constraints.push(fbWhere(field as string, '>=', value));
        break;
      case 'lt':
        constraints.push(fbWhere(field as string, '<', value));
        break;
      case 'lte':
        constraints.push(fbWhere(field as string, '<=', value));
        break;
      case 'in':
        constraints.push(fbWhere(field as string, 'in', value));
        break;
      case 'nin':
        constraints.push(fbWhere(field as string, 'not-in', value));
        break;
      case 'contains':
        constraints.push(fbWhere(field as string, 'array-contains', value));
        break;
      case 'containss':
      case 'startswith':
      case 'endswith':
      default:
        break;
    }
  });

  // Sorting
  if (sorters && sorters.length > 0) {
    sorters.forEach(sort => {
      constraints.push(
        fbOrderBy(sort.field as string, sort.order === 'asc' ? 'asc' : 'desc')
      );
    });
  }

  // Pagination (limit only; cursor-based paginação pode ser adicionada depois)
  if (pagination?.pageSize) {
    constraints.push(fbLimit(pagination.pageSize));
  }

  const baseCollection = collection(db, resource);
  return fbQuery(baseCollection, ...constraints);
}

export const firestoreDataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>(
    params: GetListParams
  ): Promise<GetListResponse<TData>> => {
    const { resource, filters, sorters, pagination } = params;
    const q = buildQuery(resource, filters, sorters, pagination);
    const snap = await getDocs(q);
    const data = snap.docs.map(
      (d: any): TData => ({ id: d.id, ...(d.data() as any) })
    );
    return { data, total: data.length } as GetListResponse<TData>;
  },
  getOne: async <TData extends BaseRecord = BaseRecord>(
    params: GetOneParams
  ): Promise<GetOneResponse<TData>> => {
    const { resource, id } = params;
    const ref = doc(db, resource, String(id));
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      throw { statusCode: 404, message: 'Not Found' } as HttpError;
    }
    return { data: { id: snap.id, ...(snap.data() as any) } as TData };
  },
  create: async <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: CreateParams<TVariables>
  ): Promise<CreateResponse<TData>> => {
    const { resource, variables } = params;
    const payload = {
      ...variables,
      createdAt: (variables as any)?.createdAt ?? serverTimestamp(),
      updatedAt: (variables as any)?.updatedAt ?? serverTimestamp(),
    } as Record<string, unknown>;
    const col = collection(db, resource);
    const ref = await addDoc(col, payload as any);
    const snap = await getDoc(ref);
    return { data: { id: ref.id, ...(snap.data() as any) } as TData };
  },
  update: async <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: UpdateParams<TVariables>
  ): Promise<UpdateResponse<TData>> => {
    const { resource, id, variables } = params;
    const ref = doc(db, resource, String(id));
    const payload: any = {
      ...variables,
      updatedAt: serverTimestamp(),
    };
    await updateDoc(ref, payload as any);
    const snap = await getDoc(ref);
    return { data: { id: ref.id, ...(snap.data() as any) } as TData };
  },
  deleteOne: async <TData extends BaseRecord = BaseRecord, TVariables = {}>(
    params: DeleteOneParams<TVariables>
  ): Promise<DeleteOneResponse<TData>> => {
    const { resource, id } = params;

    // Exclusão em cascata para pacientes → evolucao_rcp/evolucao_dnm
    if (resource === 'pacientes') {
      try {
        const collectionsToCascade = ['evolucao_rcp', 'evolucao_dnm'];
        for (const colName of collectionsToCascade) {
          const q = fbQuery(
            collection(db, colName),
            fbWhere('patient_id', '==', String(id))
          );
          const snap = await getDocs(q);
          if (!snap.empty) {
            const { writeBatch } = await import('firebase/firestore');
            const batch = writeBatch(db);
            snap.docs.forEach(d => batch.delete(d.ref));
            await batch.commit();
          }
        }
      } catch (e) {
        // Loga mas não impede a exclusão do paciente
        console.error('[Firestore] Erro ao excluir evoluções vinculadas:', e);
      }
    }

    const ref = doc(db, resource, String(id));
    await deleteDoc(ref);
    return { data: { id } as unknown as TData };
  },
  // Métodos adicionais podem ser implementados conforme a necessidade do Refine
  getApiUrl: () => '',
  custom: async () => ({ data: [] as any }),
};

export default firestoreDataProvider;
