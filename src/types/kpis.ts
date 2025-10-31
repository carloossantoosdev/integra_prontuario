export type YearMonthString = `${number}-${number}`; // formato YYYY-MM

export interface KpiMetrics {
  // Quantidades de clientes por tipo/plano
  clientes_plano_mensal: number;
  clientes_plano_longo_3m: number;
  clientes_plano_longo_6m: number;
  clientes_plano_longo_12m: number;
  clientes_agudos_avulso: number;
  clientes_cronicos_dnm: number;

  // Totais de clientes por área
  clientes_total_reab_ped: number;
  clientes_total_reab_adulto: number;
  clientes_total_reab_idoso: number;
  clientes_total_sono: number;

  // Faturamentos (R$) por área
  faturamento_reab_ped: number;
  faturamento_reab_adulto: number;
  faturamento_reab_idoso: number;
  faturamento_dnm: number;
  faturamento_sono: number;

  // Aquisição e retenção
  novos_clientes_total?: number;
  clientes_perdidos_total?: number;
  novos_por_canal?: Record<string, number>; // exemplo: { organico, indicacao, campanha_meta }

  // Operacional
  sessoes_planejadas_total?: number;
  sessoes_realizadas_total?: number;
  no_show_total?: number;
  horas_trabalhadas_total?: number;

  // Financeiro
  custo_operacional_total?: number;
  custo_marketing_total?: number;
}

export interface KpiMonthly {
  id: string;
  ref_date: string; // primeira data do mês (YYYY-MM-01)
  metrics: KpiMetrics;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
  targets?: KpiTargets | null;
}

export interface KpiQueryParams {
  from?: string; // inclusive (YYYY-MM-01)
  to?: string; // inclusive (YYYY-MM-01)
}

export interface KpiTargets {
  faturamento_total?: number;
  clientes_total?: number;
  ticket_medio?: number;
  // metas por área (opcionais)
  faturamento_reab_ped?: number;
  faturamento_reab_adulto?: number;
  faturamento_reab_idoso?: number;
  faturamento_dnm?: number;
  faturamento_sono?: number;
}

export interface KpiUpsertInput {
  refDate: YearMonthString; // YYYY-MM
  metrics: KpiMetrics;
  targets?: KpiTargets | null;
}

export function computeTickets(metrics: KpiMetrics) {
  const safeDiv = (num: number, den: number) => (den > 0 ? num / den : 0);
  const ticket_reab_ped = safeDiv(
    metrics.faturamento_reab_ped,
    metrics.clientes_total_reab_ped
  );
  const ticket_reab_adulto = safeDiv(
    metrics.faturamento_reab_adulto,
    metrics.clientes_total_reab_adulto
  );
  const ticket_reab_idoso = safeDiv(
    metrics.faturamento_reab_idoso,
    metrics.clientes_total_reab_idoso
  );
  const ticket_dnm = safeDiv(
    metrics.faturamento_dnm,
    metrics.clientes_cronicos_dnm
  );
  const ticket_sono = safeDiv(
    metrics.faturamento_sono,
    metrics.clientes_total_sono
  );

  return {
    ticket_reab_ped,
    ticket_reab_adulto,
    ticket_reab_idoso,
    ticket_dnm,
    ticket_sono,
  };
}
