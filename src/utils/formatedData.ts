export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

 export const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };