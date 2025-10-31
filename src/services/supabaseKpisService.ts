import type { KpiMonthly, KpiQueryParams, KpiUpsertInput } from '../types/kpis';
import { supabaseClient } from '../utils/supabaseClient';

const COLLECTION = 'kpis_mensais';

export async function upsertKpiMonthly(
  input: KpiUpsertInput
): Promise<KpiMonthly> {
  const refDate = `${input.refDate}-01`;

  try {
    // Tentar buscar registro existente
    const { data: existingRecord } = await supabaseClient
      .from(COLLECTION)
      .select('*')
      .eq('ref_date', refDate)
      .single();

    if (existingRecord) {
      // Atualizar registro existente
      const { data: updatedRecord, error } = await supabaseClient
        .from(COLLECTION)
        .update({
          ref_date: refDate,
          metrics: input.metrics,
          targets: input.targets ?? null,
        })
        .eq('id', existingRecord.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        ...updatedRecord,
      } as unknown as KpiMonthly;
    } else {
      // Criar um novo registro
      const { data: newRecord, error } = await supabaseClient
        .from(COLLECTION)
        .insert({
          ref_date: refDate,
          metrics: input.metrics,
          targets: input.targets ?? null,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        ...newRecord,
      } as unknown as KpiMonthly;
    }
  } catch (error: any) {
    console.error('[Supabase] Erro ao fazer upsert de KPI:', error);
    throw error;
  }
}

export async function getKpis(
  params: KpiQueryParams = {}
): Promise<KpiMonthly[]> {
  let query = supabaseClient.from(COLLECTION).select('*');

  if (params.from) {
    query = query.gte('ref_date', params.from);
  }

  if (params.to) {
    query = query.lte('ref_date', params.to);
  }

  query = query.order('ref_date', { ascending: true });

  try {
    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return (data || []) as unknown as KpiMonthly[];
  } catch (error) {
    console.error('[Supabase] Erro ao buscar KPIs:', error);
    return [];
  }
}

export async function getKpiByMonth(
  yearMonth: string
): Promise<KpiMonthly | null> {
  const refDate = `${yearMonth}-01`;

  try {
    const { data, error } = await supabaseClient
      .from(COLLECTION)
      .select('*')
      .eq('ref_date', refDate)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Nenhum registro encontrado
        return null;
      }
      throw error;
    }

    return {
      ...data,
    } as unknown as KpiMonthly;
  } catch (error: any) {
    console.error('[Supabase] Erro ao buscar KPI do mês:', error);
    throw error;
  }
}

