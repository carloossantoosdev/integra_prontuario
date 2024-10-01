export type AppointmentData = {
    id?: string;
    nome: string;
    data_nascimento: Date;
    data_primeiro_atendimento: string;
    data_ultimo_atendimento: string;
    valor: number;
    condutas: string;
    observacoes?: string;
    atendente: string;
  };
  