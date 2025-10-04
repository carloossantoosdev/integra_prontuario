import type { KpiMonthly, KpiQueryParams, KpiUpsertInput } from '../types/kpis';
import { pocketbaseClient } from '../utils/pocketbaseClient';

const COLLECTION = 'kpis_mensais';

export async function upsertKpiMonthly(
  input: KpiUpsertInput
): Promise<KpiMonthly> {
  const refDate = `${input.refDate}-01`;

  try {
    // Tentar buscar registro existente
    const existingRecord = await pocketbaseClient
      .collection(COLLECTION)
      .getFirstListItem(`ref_date = "${refDate}"`);

    // Atualizar registro existente
    const updatedRecord = await pocketbaseClient
      .collection(COLLECTION)
      .update(existingRecord.id, {
        ref_date: refDate,
        metrics: input.metrics,
        targets: input.targets ?? null,
      });

    return {
      ...updatedRecord,
    } as unknown as KpiMonthly;
  } catch (error: any) {
    // Se não encontrou, criar um novo
    if (error.status === 404) {
      const newRecord = await pocketbaseClient.collection(COLLECTION).create({
        ref_date: refDate,
        metrics: input.metrics,
        targets: input.targets ?? null,
      });

      return {
        ...newRecord,
      } as unknown as KpiMonthly;
    }

    throw error;
  }
}

export async function getKpis(
  params: KpiQueryParams = {}
): Promise<KpiMonthly[]> {
  let filter = '';
  const filterParts: string[] = [];

  if (params.from) {
    filterParts.push(`ref_date >= "${params.from}"`);
  }

  if (params.to) {
    filterParts.push(`ref_date <= "${params.to}"`);
  }

  if (filterParts.length > 0) {
    filter = filterParts.join(' && ');
  }

  try {
    const result = await pocketbaseClient
      .collection(COLLECTION)
      .getList(1, 50, {
        filter,
        sort: 'ref_date',
      });

    return result.items.map(item => ({
      ...item,
    })) as unknown as KpiMonthly[];
  } catch (error) {
    console.error('[PocketBase] Erro ao buscar KPIs:', error);
    return [];
  }
}

export async function getKpiByMonth(
  yearMonth: string
): Promise<KpiMonthly | null> {
  const refDate = `${yearMonth}-01`;

  try {
    const record = await pocketbaseClient
      .collection(COLLECTION)
      .getFirstListItem(`ref_date = "${refDate}"`);

    return {
      ...record,
    } as unknown as KpiMonthly;
  } catch (error: any) {
    if (error.status === 404) {
      return null;
    }

    console.error('[PocketBase] Erro ao buscar KPI do mês:', error);
    throw error;
  }
}
