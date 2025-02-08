interface Ssvv {
  FC: string;
  PA: string;
  SpO2: string;
  Borg_D: string;
  Borg_F: string;
  EVA_Desc: string;
}

interface AuscultaPulmonar {
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

export interface formDataProps {
  ssvv_inicial: Ssvv;
  ssvv_final: Ssvv;
  ausculta_pulmonar: AuscultaPulmonar;
  observacao: string | null;
  treinamento_aerobico: string | null;
  treinamento_resistido: string | null;
  treinamento_funcional: string | null;
  tmi: string | null;
}
