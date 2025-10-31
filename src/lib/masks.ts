/**
 * Máscara para campo de carga (adiciona "kg" automaticamente)
 * Exemplo: "5" -> "5kg"
 */
export const maskCarga = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');

  if (!numbers) return '';

  // Adiciona "kg" ao final
  return `${numbers}kg`;
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
