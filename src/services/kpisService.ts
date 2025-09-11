import { supabaseClient } from '../utils/supabaseClient';
import type { KpiMonthly, KpiQueryParams, KpiUpsertInput } from '../types/kpis';

const TABLE = 'kpis_mensais';

export async function upsertKpiMonthly(input: KpiUpsertInput) {
  const refDate = `${input.refDate}-01`;
  const payload = {
    ref_date: refDate,
    metrics: input.metrics,
  };

  const { data, error } = await supabaseClient
    .from(TABLE)
    .upsert(payload, { onConflict: 'ref_date', ignoreDuplicates: false })
    .select()
    .single();

  if (error) throw error;
  return data as KpiMonthly;
}

export async function getKpis(params: KpiQueryParams = {}) {
  let query = supabaseClient.from(TABLE).select('*').order('ref_date', {
    ascending: true,
  });
  if (params.from) query = query.gte('ref_date', params.from);
  if (params.to) query = query.lte('ref_date', params.to);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as KpiMonthly[];
}

export async function getKpiByMonth(yearMonth: string) {
  const { data, error } = await supabaseClient
    .from(TABLE)
    .select('*')
    .eq('ref_date', `${yearMonth}-01`)
    .single();
  if (error) return null;
  return data as KpiMonthly;
}
