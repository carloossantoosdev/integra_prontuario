export interface Ssvv {
  FC: string;
  PA: string;
  SpO2: string;
  Borg_D: string;
  Borg_F: string;
  EVA_Desc: string;
}

export interface AuscultaPulmonar {
  mv: {
    abolido: boolean;
    presente: boolean;
    reduzido: boolean;
  };
  ruídos: {
    roncos: boolean;
    estridor: boolean;
    espástica: boolean;
    estertores: boolean;
    'sibilos expiratorios': boolean;
    'sibilos inspiratorios': boolean;
  };
  localizacao: {
    AHT: boolean;
    base: boolean;
    Ápice: boolean;
    direita: boolean;
    esquerda: boolean;
  };
}

export interface formDataRcpProps {
  id: number;
  created_at: string;
  ssvv_inicial: Ssvv;
  ssvv_final: Ssvv;
  ausculta_pulmonar: AuscultaPulmonar;
  treinamento_aerobico: string | null;
  treinamento_resistido: string | null;
  treinamento_funcional: string | null;
  tmi: string | null;
  terapia_expansao: string | null;
  terapia_remo_secrecao: string | null;
  data_atendimento: Date;
  fisioterapeuta: string | null;
  observacao: string | null;
}
