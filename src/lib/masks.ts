/**
 * Máscara para campo de carga (permite letras e números)
 * Exemplo: "5" -> "5kg", "vermelho" -> "vermelho", "amarelo 2" -> "amarelo 2"
 */
export const maskCarga = (value: string): string => {
  // Remove apenas caracteres especiais, mantém letras, números e espaços
  const cleaned = value.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '');

  if (!cleaned) return '';

  return cleaned;
};

/**
 * Máscara para campo de séries/repetições (adiciona "/" automaticamente)
 * Exemplo: "310" -> "3/10"
 */
export const maskSeriesRepeticoes = (value: string): string => {
  let cleaned = value.replace(/[^\d/]/g, '');

  cleaned = cleaned.replace(/\/+/g, '/');

  if (cleaned.includes('/')) {
    const parts = cleaned.split('/');
    if (parts.length > 2) {
      cleaned = `${parts[0]}/${parts[1]}`;
    }
    return cleaned;
  }

  if (cleaned.length > 1) {
    return `${cleaned.charAt(0)}/${cleaned.slice(1)}`;
  }

  return cleaned;
};

/**
 * Remove a máscara de carga (remove "kg")
 */
export const unmaskCarga = (value: string): string => {
  return value.replace(/[^\d]/g, '');
};

/**
 * Remove a máscara de séries/repetições (mantém apenas números e /)
 */
export const unmaskSeriesRepeticoes = (value: string): string => {
  return value.replace(/[^\d/]/g, '');
};
