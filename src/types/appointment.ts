export type AppointmentData = {
  id?: number;
  nome:string;
  data_atendimento: string;           // Data do Atendimento
  ssvv_inicial_fc: number;            // Frequência Cardíaca Inicial (bpm)
  ssvv_inicial_spo2: number;          // SpO2 Inicial (%)
  ssvv_inicial_fr: number;            // Frequência Respiratória Inicial (ipm)
  ssvv_inicial_pa: number;            // Pressão Arterial Inicial (mmHg)
  
  ssvv_final_fc?: number;             // Frequência Cardíaca Final (bpm)
  ssvv_final_spo2?: number;           // SpO2 Final (%)
  ssvv_final_fr?: number;             // Frequência Respiratória Final (ipm)
  ssvv_final_pa?: number;             // Pressão Arterial Final (mmHg)
  
  ausculta_pulmonar?: string;         // Ausculta Pulmonar (presente, reduzido, abolido)
  localizacao?: string;               // Localização (AHT, direita, esquerda, ápice, base)
  ruido?: string;                     // Ruídos (roncos, sibilos inspiratórios, sibilos expiratórios, espástico, estertores, estridor)
  
  modo_ventilatorio?: string;         // Modo Ventilatório
  ipap?: number;                      // IPAP
  epap?: number;                      // EPAP
  fr?: number;                        // Frequência Respiratória
  tins?: number;                      // Tins
  ie?: string;                        // Proporção I:E
  t_sub?: number;                     // T sub
  sens?: number;                      // Sens
  vc?: number;                        // Volume Corrente
  vm?: number;                        // Ventilação Minuto

  periodo?: string;                   // Período da Ventilação Mecânica
  dias_uso?: number;                  // Dias de Uso
  dias_4h_plus?: number;              // Dias com 4h +
  fuga?: boolean;                     // Fuga
  resp_espont?: number;               // % resp espont.
  iah?: number;                       // IAH (Índice de Apneia/Hipopneia)
};