// components/renderHelpers.tsx
import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

export const formatKey = (key: string) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
};

export const formatObject = (obj: { [s: string]: any }) => {
  return Object.entries(obj)
    .map(([key, value]) => {
      // Formata a chave, colocando a primeira letra em maiúsculas
      const formattedKey = formatKey(key);

      // Se a chave for uma das que você quer destacar
      if (
        formattedKey.toLowerCase() === 'carga' ||
        formattedKey.toLowerCase().includes('series') ||
        formattedKey.toLowerCase() === 'descrição' ||
        formattedKey.toLowerCase() === 'parametros' ||
        formattedKey.toLowerCase() === 'tipo' ||
        formattedKey.toLowerCase() === 'repeticoes_tempo'
      ) {
        return (
          <span key={key}>
            <strong>{formattedKey}:</strong> {value}
            {'; '}
          </span>
        );
      }

      if (typeof value === 'object' && value !== null) {
        return (
          <span key={key}>
            {formattedKey}: {formatObject(value)}
          </span>
        );
      }

      return (
        <span key={key}>
          {formattedKey}: {value}
        </span>
      );
    })
    .reduce((prev, curr) => (
      <>
        {prev} {curr}
      </>
    ));
};

export const renderDataTable = (data: { [key: string]: any }) => {
  if (!data) {
    return (
      <TableRow>
        <TableCell colSpan={2}>Sem dados</TableCell>
      </TableRow>
    );
  }

  const filteredData = Object.entries(data).filter(([_, value]) => {
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(val => val !== '');
    }
    return value !== '';
  });

  return filteredData.map(([key, value]) => (
    <TableRow key={key}>
      <TableCell style={{ fontWeight: 600 }}>
        <strong>{formatKey(key)}</strong>
      </TableCell>
      <TableCell>
        {typeof value === 'object' && value !== null
          ? Object.entries(value).map(([subKey, subValue]) => {
              return subValue ? (
                <div key={subKey}>
                  <strong>{formatKey(subKey)}:</strong> {String(subValue)}{' '}
                  {/* Negrito aplicado aqui também */}
                </div>
              ) : null;
            })
          : value}
      </TableCell>
    </TableRow>
  ));
};

export const renderTerapia = (terapia: any, title: string) => {
  return (
    <>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        marginTop={2}
      >
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>{renderDataTable(terapia)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export const renderTreinamento = (treinamento: any, title: string) => {
  return (
    <>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        marginTop={2}
      >
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>{renderDataTable(treinamento)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export const renderAuscultaPulmonar = (ausculta: any, vital: any) => {
  if (!ausculta) return null;

  return (
    <>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        marginTop={2}
      >
        Ausculta Pulmonar
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {Object.entries(ausculta).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell style={{ fontWeight: 600 }}>{key}</TableCell>
                <TableCell>
                  {typeof value === 'object' && value !== null
                    ? Object.keys(value).join(', ') || 'Nenhum'
                    : (value as React.ReactNode)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
